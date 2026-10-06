import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

type BookingRecord = {
  id: string;
  equipment_id: string;
  borrower_name: string;
  start_at: string;
  end_at: string;
  purpose: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// 1. GET /api/equipment
app.get('/api/equipment', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT id, name, location FROM equipment').all();
  return c.json(results, 200);
});

// 2. GET /api/bookings
app.get('/api/bookings', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT id, equipment_id AS equipmentId, borrower_name AS borrowerName, start_at AS startAt, end_at AS endAt, purpose FROM bookings'
  ).all();
  return c.json(results, 200);
});

// 3. GET /api/bookings/:id
app.get('/api/bookings/:id', async (c) => {
  const id = c.req.param('id');
  const booking = await c.env.DB.prepare(
    'SELECT id, equipment_id AS equipmentId, borrower_name AS borrowerName, start_at AS startAt, end_at AS endAt, purpose FROM bookings WHERE id = ?'
  ).bind(id).first();

  if (!booking) {
    return c.json({ error: 'Booking not found' }, 404);
  }

  return c.json(booking, 200);
});

// 4. POST /api/bookings
app.post('/api/bookings', async (c) => {
  const body = await c.req.json();
  const { equipmentId, borrowerName, startAt, endAt, purpose } = body;

  if (!equipmentId || !borrowerName || !startAt || !endAt || !purpose) {
    return c.json({ error: 'Missing required fields' }, 400);
  }

  if (new Date(startAt) >= new Date(endAt)) {
    return c.json({ error: 'startAt must be before endAt' }, 400);
  }

  const eqExists = await c.env.DB.prepare('SELECT id FROM equipment WHERE id = ?').bind(equipmentId).first();
  if (!eqExists) {
    return c.json({ error: 'Equipment not found' }, 400);
  }

  const overlap = await c.env.DB.prepare(
    'SELECT id FROM bookings WHERE equipment_id = ? AND start_at < ? AND end_at > ?'
  ).bind(equipmentId, endAt, startAt).first();

  if (overlap) {
    return c.json({ error: 'Booking time conflicts with an existing booking' }, 409);
  }

  const id = `bk-${Date.now()}`;
  await c.env.DB.prepare(
    'INSERT INTO bookings (id, equipment_id, borrower_name, start_at, end_at, purpose) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(id, equipmentId, borrowerName, startAt, endAt, purpose).run();

  return c.json({ id, equipmentId, borrowerName, startAt, endAt, purpose }, 201);
});

// 5. PATCH /api/bookings/:id
app.patch('/api/bookings/:id', async (c) => {
  const id = c.req.param('id');
  const existing = await c.env.DB.prepare('SELECT * FROM bookings WHERE id = ?').bind(id).first<BookingRecord>();

  if (!existing) {
    return c.json({ error: 'Booking not found' }, 404);
  }

  const body = await c.req.json();
  const equipmentId = body.equipmentId ?? existing.equipment_id;
  const borrowerName = body.borrowerName ?? existing.borrower_name;
  const startAt = body.startAt ?? existing.start_at;
  const endAt = body.endAt ?? existing.end_at;
  const purpose = body.purpose ?? existing.purpose;

  if (new Date(startAt as string) >= new Date(endAt as string)) {
    return c.json({ error: 'startAt must be before endAt' }, 400);
  }

  const eqExists = await c.env.DB.prepare('SELECT id FROM equipment WHERE id = ?').bind(equipmentId).first();
  if (!eqExists) {
    return c.json({ error: 'Equipment not found' }, 400);
  }

  const overlap = await c.env.DB.prepare(
    'SELECT id FROM bookings WHERE equipment_id = ? AND start_at < ? AND end_at > ? AND id != ?'
  ).bind(equipmentId, endAt, startAt, id).first();

  if (overlap) {
    return c.json({ error: 'Booking time conflicts with an existing booking' }, 409);
  }

  await c.env.DB.prepare(
    'UPDATE bookings SET equipment_id = ?, borrower_name = ?, start_at = ?, end_at = ?, purpose = ? WHERE id = ?'
  ).bind(equipmentId, borrowerName, startAt, endAt, purpose, id).run();

  return c.json({ id, equipmentId, borrowerName, startAt, endAt, purpose }, 200);
});

// 6. DELETE /api/bookings/:id
app.delete('/api/bookings/:id', async (c) => {
  const id = c.req.param('id');
  const existing = await c.env.DB.prepare('SELECT id FROM bookings WHERE id = ?').bind(id).first();

  if (!existing) {
    return c.json({ error: 'Booking not found' }, 404);
  }

  await c.env.DB.prepare('DELETE FROM bookings WHERE id = ?').bind(id).run();
  return c.body(null, 204);
});

export default app;