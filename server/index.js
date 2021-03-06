const send = require('koa-send');
const Koa = require('koa');
const Router = require('koa-router');
const userAgent = require('koa-useragent');
const path = require('path')
const swig = require('swig');
const bodyParser = require('koa-bodyparser');
const router = new Router();
const app = new Koa();

const templateRoot = path.join(__dirname, "../dist/template")

app.use(userAgent);
app.use(bodyParser());

router.get('/', function(ctx, next){
    ctx.cookies.set("landing", ctx.request.query.landing, {
        httpOnly: false,
    })
    let template = swig.compileFile(path.resolve(templateRoot, "index.html"));
    ctx.body = template({});
});

router.get('/landing', function(ctx, next){
    ctx.cookies.set("landing", ctx.request.query.landing, {
        httpOnly: false,
    })
    let template = swig.compileFile(path.resolve(templateRoot, "index.html"));
    ctx.body = template({});
});

router.get('/recommend', function(ctx, next){
    ctx.cookies.set("landing", ctx.request.query.landing, {
        httpOnly: false,
    })
    let template = swig.compileFile(path.resolve(templateRoot, "index.html"));
    ctx.body = template({});
});

router.get('/tip/:id', function(ctx, next){
    ctx.cookies.set("landing", ctx.request.query.landing, {
        httpOnly: false,
    })
    let template = swig.compileFile(path.resolve(templateRoot, "index.html"));
    ctx.body = template({});
});

router.get('/courses', function(ctx, next){
    ctx.cookies.set("landing", ctx.request.query.landing, {
        httpOnly: false,
    })
    let template = swig.compileFile(path.resolve(templateRoot, "index.html"));
    ctx.body = template({});
});

router.get('/course/:id', function(ctx, next){
    ctx.cookies.set("landing", ctx.request.query.landing, {
        httpOnly: false,
    })
    let template = swig.compileFile(path.resolve(templateRoot, "index.html"));
    ctx.body = template({});
});

router.get('/search_result', function(ctx, next){
    ctx.cookies.set("landing", ctx.request.query.landing, {
        httpOnly: false,
    })
    let template = swig.compileFile(path.resolve(templateRoot, "index.html"));
    ctx.body = template({});
});

router.get(/^\/static(?:\/|$)/, async(ctx) => {
    let filePath = ctx.path.replace(/static\//, "")
     await send(ctx, filePath, {
         root: path.join(__dirname, "../dist")
     });
})

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8080);
console.log('listening on port 8080');