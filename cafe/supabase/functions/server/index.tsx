import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-940d8cd3/health", (c) => {
  return c.json({ status: "ok" });
});

// Newsletter subscription endpoint
app.post("/make-server-940d8cd3/newsletter/subscribe", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return c.json({ error: "Valid email is required" }, 400);
    }

    // Check if email already exists
    const existing = await kv.get(`newsletter:${email}`);
    if (existing) {
      return c.json({ error: "Email already subscribed" }, 409);
    }

    // Save subscription
    await kv.set(`newsletter:${email}`, {
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    });

    console.log(`Newsletter subscription: ${email}`);
    return c.json({
      success: true,
      message: "Successfully subscribed to newsletter"
    });
  } catch (error) {
    console.error(`Newsletter subscription error: ${error}`);
    return c.json({ error: "Failed to subscribe" }, 500);
  }
});

// Get all newsletter subscribers (admin endpoint)
app.get("/make-server-940d8cd3/newsletter/subscribers", async (c) => {
  try {
    const subscribers = await kv.getByPrefix("newsletter:");
    return c.json({
      subscribers,
      count: subscribers.length
    });
  } catch (error) {
    console.error(`Error fetching subscribers: ${error}`);
    return c.json({ error: "Failed to fetch subscribers" }, 500);
  }
});

// Create order endpoint
app.post("/make-server-940d8cd3/orders", async (c) => {
  try {
    const body = await c.req.json();
    const { customerName, customerEmail, items, total } = body;

    if (!customerName || !customerEmail || !items || items.length === 0) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const order = {
      id: orderId,
      customerName,
      customerEmail,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await kv.set(`order:${orderId}`, order);

    console.log(`New order created: ${orderId} for ${customerEmail}`);
    return c.json({
      success: true,
      orderId,
      message: "Order placed successfully"
    });
  } catch (error) {
    console.error(`Order creation error: ${error}`);
    return c.json({ error: "Failed to create order" }, 500);
  }
});

// Get order by ID
app.get("/make-server-940d8cd3/orders/:orderId", async (c) => {
  try {
    const orderId = c.req.param('orderId');
    const order = await kv.get(`order:${orderId}`);

    if (!order) {
      return c.json({ error: "Order not found" }, 404);
    }

    return c.json({ order });
  } catch (error) {
    console.error(`Error fetching order: ${error}`);
    return c.json({ error: "Failed to fetch order" }, 500);
  }
});

// Get all orders (admin endpoint)
app.get("/make-server-940d8cd3/orders", async (c) => {
  try {
    const orders = await kv.getByPrefix("order:");
    return c.json({
      orders,
      count: orders.length
    });
  } catch (error) {
    console.error(`Error fetching orders: ${error}`);
    return c.json({ error: "Failed to fetch orders" }, 500);
  }
});

// Contact form endpoint
app.post("/make-server-940d8cd3/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return c.json({ error: "All fields are required" }, 400);
    }

    const contactId = `contact_${Date.now()}`;
    await kv.set(`contact:${contactId}`, {
      id: contactId,
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    });

    console.log(`New contact form submission: ${contactId} from ${email}`);
    return c.json({
      success: true,
      message: "Message sent successfully"
    });
  } catch (error) {
    console.error(`Contact form error: ${error}`);
    return c.json({ error: "Failed to send message" }, 500);
  }
});

Deno.serve(app.fetch);