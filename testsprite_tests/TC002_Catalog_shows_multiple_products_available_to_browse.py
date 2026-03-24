import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> Navigate to http://localhost:5173
        await page.goto("http://localhost:5173", wait_until="commit", timeout=10000)
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        # Verify we are on the root/catalog page
        assert "/" in frame.url, f"Expected '/' in frame.url, got: {frame.url}"
        
        # Check product list existence by asserting a product item's "View Details" link is visible
        locator = frame.locator('xpath=/html/body/div/div/div/div/div/div[1]/div/div/a')
        assert await locator.is_visible(), "Product list is not visible: no product items found."
        
        # Verify "View Details" text is visible (using the first product's link)
        assert await frame.locator('xpath=/html/body/div/div/div/div/div/div[1]/div/div/a').is_visible(), '"View Details" is not visible.'
        
        # The "Buy" element/text is not present in the available elements list -> report issue and stop
        raise AssertionError('Feature "Buy" not found on page; cannot verify "Buy" is visible.')
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    