const send = require("koa-send");
const Koa = require("koa");
const Router = require("koa-router");
const userAgent = require("koa-useragent");
const path = require("path");
const swig = require("swig");
const bodyParser = require("koa-bodyparser");

const router = new Router();
const app = new Koa();

const templateRoot = path.join(__dirname, "../dist/template");

app.use(userAgent);
app.use(bodyParser());

router.get(/^\/static(?:\/|$)/, async ctx => {
  const filePath = ctx.path.replace(/static\//, "");
  await send(ctx, filePath, {
    root: path.join(__dirname, "../dist")
  });
});

router.get(/^\/(.*)$/, ctx => {
  ctx.cookies.set("landing", ctx.request.query.landing, {
    httpOnly: false
  });
  if (!ctx.userAgent.isMobile) {
    const template = swig.compileFile(path.resolve(templateRoot, "pc.html"));
    ctx.body = template({});
  } else {
    const template = swig.compileFile(path.resolve(templateRoot, "index.html"));
    ctx.body = template({});
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log("listening on port 3000");
