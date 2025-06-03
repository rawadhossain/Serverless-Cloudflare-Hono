import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";

const app = new Hono();

app.get("/", (c) => c.text("Hello Cloudflare Workers!"));

//do not need middleware for this route
app.post("/api/v1/signup", async (c) => {
	const body = await c.req.json();

	const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c); //better solve for ts-ignore

	const prisma = new PrismaClient({
		datasourceUrl: DATABASE_URL,
	}).$extends(withAccelerate());

	console.log(body);

	const user = await prisma.user.create({
		data: {
			name: body.name,
			email: body.email,
			password: body.password,
		},
	});

	return c.json({ id: user.id });
});

app.post("/api/v1/signin", async (c) => {
	return c.json({
		message: "user is signing in",
	});
});

// All routes after middleware are protected, before middleware are public
app.use(async (c, next) => {
	if (c.req.header("Authorization")) {
		// Do validation
		console.log("auth header found");
		await next();
	} else {
		console.log("auth header not found");
		return c.text("You dont have acces");
	}
});

//has to be under middleware --protected
app.post("/api/v1/todo", async (c) => {
	return c.json({
		message: "user is posting todos",
	});
});

//has to be under middleware --protected
app.get("/api/v1/todo", async (c) => {
	return c.json({
		message: "user is getting todos",
	});
});

export default app;
