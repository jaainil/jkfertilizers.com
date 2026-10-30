const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
// Run against a local dev server. Provide PLAYWRIGHT_MODULE if Playwright is installed outside this project.
const assert=require('node:assert/strict');
const baseURL=process.env.BASE_URL || 'http://127.0.0.1:3000';
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const checkTrap=async(dialog)=>{
  await dialog.waitFor({state:'visible'});
  assert(await dialog.evaluate(el=>el.contains(document.activeElement)),'initial focus in dialog');
  for(let i=0;i<35;i++) {await page.keyboard.press('Tab');assert(await dialog.evaluate(el=>el.contains(document.activeElement)),'Tab contained');}
  for(let i=0;i<35;i++) {await page.keyboard.press('Shift+Tab');assert(await dialog.evaluate(el=>el.contains(document.activeElement)),'Shift+Tab contained');}
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
 };
 await page.goto(baseURL);
 assert.equal(await page.getByRole('button',{name:/AI Assistant|Ask Agronomy/}).count(),0);
 await page.keyboard.press('Control+k');
 assert.equal(await page.getByRole('dialog').count(),0);
 await page.getByRole('button',{name:'Open menu',exact:true}).click();
 await checkTrap(page.getByRole('dialog',{name:'Navigation menu'}));
 await page.keyboard.press('Escape');
 assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'Open menu');
 assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
 await page.getByRole('button',{name:'Open menu',exact:true}).click();
 await page.mouse.click(5,400);
 await page.waitForFunction(()=>document.querySelector('[data-testid="mobile-navigation-panel"]').getAttribute('aria-hidden')==='true');
 await page.getByRole('button',{name:'Open menu',exact:true}).click();
 await page.setViewportSize({width:1440,height:900});
 await page.waitForFunction(()=>document.querySelector('[data-testid="mobile-navigation-panel"]').getAttribute('aria-hidden')==='true');
 assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
 await page.setViewportSize({width:390,height:844});
 console.log('PASS mobile drawer: focus, Tab cycles, Escape, restore, backdrop, resize');
 await page.goto(`${baseURL}/products`);
 const category=page.locator('button[aria-pressed="false"]').first();
 const categoryElement=await category.elementHandle(); await category.click();
 assert.equal(await categoryElement.getAttribute('aria-pressed'),'true');
 assert.match(await page.getByRole('status').innerText(),/products? found/);
 console.log('PASS product filter selection and result announcement');
 await page.goto(`${baseURL}/products/organic-manure`);
 const zoom=page.getByRole('button',{name:'Zoom image',exact:true}); await zoom.click();
 await checkTrap(page.getByRole('dialog',{name:/image viewer/}));
 await page.keyboard.press('ArrowRight'); await page.keyboard.press('Escape');
 assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'Zoom image');
 console.log('PASS lightbox: focus, keyboard cycling, Escape, restore');
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});await page.goto(`${baseURL}/products`);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no page overflow');
  await page.screenshot({path:`/tmp/harden-${width}.png`});
 }
 assert.deepEqual(errors,[]);console.log('PASS mobile/desktop overflow and no runtime errors');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
