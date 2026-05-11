/**
 * Expose a function to the page if it does not exist
 *
 * NOTE:
 * Rewrite it to 'upsertFunction' after updating Puppeteer to 20.6 or higher
 * using page.removeExposedFunction
 * https://pptr.dev/api/puppeteer.page.removeexposedfunction
 *
 * @param {object} page - Puppeteer Page instance
 * @param {string} name
 * @param {Function} fn
 */
async function exposeFunctionIfAbsent(page, name, fn) {
    try {
        await page.exposeFunction(name, fn);
    } catch (e) {
        const msg = e.message || '';
        // Ignore if binding is already registered (Puppeteer's internal registry
        // keeps bindings after navigation even though window[name] is cleared),
        // or if an iframe was closed mid-navigation (TargetCloseError).
        if (
            !msg.includes('already exists') &&
            !msg.includes('Session closed')
        ) {
            throw e;
        }
    }
}

module.exports = { exposeFunctionIfAbsent };
