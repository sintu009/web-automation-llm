import dotenv from "dotenv";
import { Agent, run, tool } from "@openai/agents";
import { chromium } from "playwright";
import z from "zod";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import ora from "ora";

dotenv.config();

// Beautiful console styling
const chaiGradient = gradient(['#FF6B35', '#F7931E', '#FFD23F']);
const codeGradient = gradient(['#4ECDC4', '#44A08D', '#093637']);
const successGradient = gradient(['#11998e', '#38ef7d']);
const errorGradient = gradient(['#FC466B', '#3F5EFB']);

// Custom console logger with chai aur code theme
class ChaiLogger {
  static header() {
    console.clear();
    console.log(chaiGradient(figlet.textSync('CHAI AUR CODE', {
      font: 'ANSI Shadow',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    })));
    console.log(codeGradient('━'.repeat(80)));
    console.log(chalk.yellow('☕') + ' ' + chaiGradient('Brewing automation magic with code...') + ' ' + chalk.blue('💻'));
    console.log(codeGradient('━'.repeat(80)) + '\n');
  }

  static success(message) {
    console.log(chalk.green('✅') + ' ' + successGradient(message));
  }

  static error(message) {
    console.log(chalk.red('❌') + ' ' + errorGradient(message));
  }

  static info(message) {
    console.log(chalk.cyan('ℹ️ ') + ' ' + chalk.white(message));
  }

  static warning(message) {
    console.log(chalk.yellow('⚠️ ') + ' ' + chalk.yellow(message));
  }

  static step(step, message) {
    console.log(chaiGradient(`[STEP ${step}]`) + ' ' + chalk.white(message));
  }

  static action(icon, message) {
    console.log(chalk.magenta(icon) + ' ' + codeGradient(message));
  }

  static divider() {
    console.log(chalk.gray('─'.repeat(60)));
  }
}

// Initialize beautiful CLI
ChaiLogger.header();
console.log(chalk.blue('🚀') + ' ' + chaiGradient('Starting Chai Aur Code automation script...'));

const spinner = ora({
  text: chaiGradient('Setting up browser environment...'),
  spinner: 'bouncingBall'
}).start();

const browser = await chromium.launch({
  headless: false,
  chromiumSandbox: false,
  args: [
    "--no-sandbox", 
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-extensions",
    "--no-first-run"
  ],
});

let page;
spinner.succeed(successGradient('Browser launched successfully! Ready to code! ☕'));

const openBrowser = tool({
  name: "open_browser",
  description: "Open a new browser page with chai aur code magic",
  parameters: z.object({}),
  async execute() {
    try {
      const actionSpinner = ora(chaiGradient('Opening new browser page...')).start();
      page = await browser.newPage();
      await page.setViewportSize({ width: 1280, height: 720 });
      actionSpinner.succeed(successGradient('Browser page opened successfully! Time for some code! 💻'));
      return "Browser page opened successfully";
    } catch (error) {
      ChaiLogger.error(`Failed to open browser page: ${error.message}`);
      return `Failed to open browser: ${error.message}`;
    }
  },
});

const openUrl = tool({
  name: "open_url",
  description: "Navigate to a specific URL with style",
  parameters: z.object({
    url: z.string(),
  }),
  async execute({ url }) {
    try {
      ChaiLogger.divider();
      ChaiLogger.action('🌐', `Navigating to: ${url}`);
      
      const navSpinner = ora(codeGradient('Loading page...')).start();
      const response = await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      const finalUrl = page.url();
      navSpinner.succeed(successGradient(`Navigation successful! Final URL: ${finalUrl}`));
      ChaiLogger.info(`Response status: ${response?.status()}`);
      
      return `Successfully navigated to ${finalUrl}. Status: ${response?.status()}`;
    } catch (error) {
      ChaiLogger.error(`Navigation failed to ${url}: ${error.message}`);
      return `Failed to navigate to ${url}: ${error.message}`;
    }
  },
});

const screenshot = tool({
  name: "screenshot",
  description: "Capture the current moment in pixels",
  parameters: z.object({}),
  async execute() {
    try {
      const screenshotSpinner = ora(chaiGradient('Capturing screenshot...')).start();
      const screenshotBuffer = await page.screenshot({
        type: "png",
        fullPage: false,
      });
      const base64Data = screenshotBuffer.toString('base64');
      const sizeKB = Math.round(base64Data.length / 1024);
      
      screenshotSpinner.succeed(successGradient(`📸 Screenshot captured! Size: ${sizeKB}KB`));
      return `Screenshot captured successfully. Base64 length: ${base64Data.length}`;
    } catch (error) {
      ChaiLogger.error(`Screenshot failed: ${error.message}`);
      return `Failed to take screenshot: ${error.message}`;
    }
  },
});

const getPageInfo = tool({
  name: "get_page_info",
  description: "Get current page information with chai precision",
  parameters: z.object({}),
  async execute() {
    try {
      const url = page.url();
      const title = await page.title();
      
      ChaiLogger.action('📄', `Current page details:`);
      console.log(chalk.yellow('   🔗 URL:') + ' ' + chalk.white(url));
      console.log(chalk.yellow('   📝 Title:') + ' ' + chalk.white(title));
      
      return `Current URL: ${url} | Title: ${title}`;
    } catch (error) {
      ChaiLogger.error(`Failed to get page info: ${error.message}`);
      return `Failed to get page info: ${error.message}`;
    }
  },
});

const findElementsByText = tool({
  name: "find_elements_by_text",
  description: "Hunt for elements with chai-like precision",
  parameters: z.object({
    searchText: z.string(),
  }),
  async execute({ searchText }) {
    try {
      ChaiLogger.action('🔍', `Searching for elements containing: "${searchText}"`);
      
      const searchSpinner = ora(codeGradient('Scanning the page...')).start();
      
      const elements = await page.evaluate((text) => {
        const allElements = Array.from(document.querySelectorAll('*'));
        const matchingElements = allElements
          .filter(el => {
            const textContent = el.textContent || '';
            return textContent.toLowerCase().includes(text.toLowerCase()) && 
                   textContent.trim().length > 0 && 
                   textContent.trim().length < 200;
          })
          .map(el => {
            const rect = el.getBoundingClientRect();
            return {
              tagName: el.tagName,
              textContent: el.textContent?.trim().substring(0, 100),
              className: el.className,
              id: el.id,
              x: Math.round(rect.x + rect.width / 2),
              y: Math.round(rect.y + rect.height / 2),
              visible: rect.width > 0 && rect.height > 0
            };
          })
          .filter(el => el.visible)
          .slice(0, 5);
        
        return matchingElements;
      }, searchText);

      searchSpinner.succeed(successGradient(`Found ${elements.length} elements containing "${searchText}"`));
      
      elements.forEach((el, index) => {
        console.log(chalk.cyan(`   ${index + 1}.`) + ' ' + chalk.yellow(el.tagName) + ' ' + chalk.white(el.textContent?.substring(0, 50)) + chalk.gray('...'));
        console.log(chalk.gray(`      Position: (${el.x}, ${el.y})`));
      });
      
      return `Found ${elements.length} elements: ${JSON.stringify(elements, null, 2)}`;
    } catch (error) {
      ChaiLogger.error(`Element search failed: ${error.message}`);
      return `Failed to search elements: ${error.message}`;
    }
  },
});

const clickOnScreen = tool({
  name: "click_screen",
  description: "Click with precision and style",
  parameters: z.object({
    x: z.number(),
    y: z.number(),
  }),
  async execute({ x, y }) {
    try {
      ChaiLogger.action('🖱️', `Clicking at coordinates (${x}, ${y})`);
      
      const clickSpinner = ora(chaiGradient('Executing click...')).start();
      await page.mouse.click(x, y);
      await page.waitForTimeout(1000);
      
      clickSpinner.succeed(successGradient(`Clicked successfully at (${x}, ${y})`));
      return `Clicked at coordinates (${x}, ${y})`;
    } catch (error) {
      ChaiLogger.error(`Click failed at (${x}, ${y}): ${error.message}`);
      return `Failed to click at (${x}, ${y}): ${error.message}`;
    }
  },
});

const navigateToPath = tool({
  name: "navigate_to_path",
  description: "Navigate to a specific path like a pro coder",
  parameters: z.object({
    path: z.string(),
  }),
  async execute({ path }) {
    try {
      ChaiLogger.action('🛤️', `Navigating to path: ${path}`);
      
      const currentUrl = page.url();
      const baseUrl = new URL(currentUrl).origin;
      const newUrl = `${baseUrl}${path}`;
      
      console.log(chalk.gray(`   Full URL: ${newUrl}`));
      
      const pathSpinner = ora(codeGradient('Navigating to new path...')).start();
      const response = await page.goto(newUrl, { 
        waitUntil: 'networkidle',
        timeout: 15000 
      });
      
      const finalUrl = page.url();
      pathSpinner.succeed(successGradient(`Path navigation successful: ${finalUrl}`));
      
      return `Successfully navigated to ${finalUrl}. Status: ${response?.status()}`;
    } catch (error) {
      ChaiLogger.error(`Path navigation failed to ${path}: ${error.message}`);
      return `Failed to navigate to ${path}: ${error.message}`;
    }
  },
});

const typeText = tool({
  name: "type_text",
  description: "Type text with chai-smooth keystrokes",
  parameters: z.object({
    text: z.string(),
  }),
  async execute({ text }) {
    try {
      ChaiLogger.action('⌨️', `Typing text: "${text}"`);
      
      const typeSpinner = ora(chaiGradient('Typing...')).start();
      await page.keyboard.type(text, { delay: 50 });
      await page.waitForTimeout(500);
      
      typeSpinner.succeed(successGradient(`Text typed successfully: "${text}"`));
      return `Successfully typed: ${text}`;
    } catch (error) {
      ChaiLogger.error(`Failed to type text "${text}": ${error.message}`);
      return `Failed to type text: ${error.message}`;
    }
  },
});

const fillForm = tool({
  name: "fill_form",
  description: "Fill forms with chai precision and code elegance",
  parameters: z.object({}),
  async execute() {
    try {
      ChaiLogger.divider();
      ChaiLogger.action('📝', 'Starting intelligent form filling process...');
      
      const formSpinner = ora(codeGradient('Analyzing form fields...')).start();
      
      // Get all input fields
      const inputs = await page.$$eval('input, textarea, select', elements => {
        return elements.map(el => {
          const rect = el.getBoundingClientRect();
          return {
            type: el.type || el.tagName.toLowerCase(),
            name: el.name,
            id: el.id,
            placeholder: el.placeholder,
            required: el.required,
            x: Math.round(rect.x + rect.width / 2),
            y: Math.round(rect.y + rect.height / 2),
            visible: rect.width > 0 && rect.height > 0
          };
        }).filter(el => el.visible);
      });
      
      formSpinner.succeed(successGradient(`Found ${inputs.length} form fields to fill`));
      
      const sampleData = {
        email: "chai.coder@chaiaurcode.com",
        name: "Chai Aur Code",
        username: "chaicoder2024",
        password: "ChaiCode@123!",
        phone: "9876543210",
        firstname: "Chai",
        lastname: "Code"
      };
      
      console.log(chalk.yellow('📋 Form fields detected:'));
      inputs.forEach((input, index) => {
        console.log(chalk.cyan(`   ${index + 1}.`) + ' ' + chalk.white(`${input.type} (${input.name || input.id || 'unnamed'})`));
      });
      
      for (const [index, input] of inputs.entries()) {
        let value = "";
        
        // Intelligent field detection
        if (input.type === 'email' || input.name?.includes('email') || input.placeholder?.toLowerCase().includes('email')) {
          value = sampleData.email;
        } else if (input.type === 'password' || input.name?.includes('password')) {
          value = sampleData.password;
        } else if (input.name?.includes('name') && input.name?.includes('first')) {
          value = sampleData.firstname;
        } else if (input.name?.includes('name') && input.name?.includes('last')) {
          value = sampleData.lastname;
        } else if (input.name?.includes('name') || input.placeholder?.toLowerCase().includes('name')) {
          value = sampleData.name;
        } else if (input.name?.includes('phone') || input.placeholder?.toLowerCase().includes('phone')) {
          value = sampleData.phone;
        } else if (input.name?.includes('username') || input.placeholder?.toLowerCase().includes('username')) {
          value = sampleData.username;
        } else if (input.type === 'text' || input.type === 'textarea') {
          value = sampleData.name;
        }
        
        if (value) {
          const fieldSpinner = ora(chaiGradient(`Filling field ${index + 1}/${inputs.length}...`)).start();
          await page.mouse.click(input.x, input.y);
          await page.waitForTimeout(300);
          await page.keyboard.selectAll();
          await page.keyboard.type(value, { delay: 50 });
          await page.waitForTimeout(300);
          fieldSpinner.succeed(chalk.green(`✓ Filled: ${input.name || input.id} = ${value}`));
        }
      }
      
      ChaiLogger.success('Form filling completed with chai precision! ☕');
      return `Successfully filled ${inputs.length} form fields`;
    } catch (error) {
      ChaiLogger.error(`Form filling failed: ${error.message}`);
      return `Failed to fill form: ${error.message}`;
    }
  },
});

const submitForm = tool({
  name: "submit_form",
  description: "Submit forms with the power of chai and code",
  parameters: z.object({}),
  async execute() {
    try {
      ChaiLogger.action('🎯', 'Looking for submit button with chai intelligence...');
      
      const submitSpinner = ora(codeGradient('Hunting for submit button...')).start();
      
      const submitButtons = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, input[type="submit"], input[type="button"]'));
        return buttons
          .filter(btn => {
            const text = btn.textContent?.toLowerCase() || btn.value?.toLowerCase() || '';
            return text.includes('submit') || text.includes('sign up') || 
                   text.includes('register') || text.includes('create');
          })
          .map(btn => {
            const rect = btn.getBoundingClientRect();
            return {
              text: btn.textContent || btn.value,
              x: Math.round(rect.x + rect.width / 2),
              y: Math.round(rect.y + rect.height / 2),
              visible: rect.width > 0 && rect.height > 0
            };
          })
          .filter(btn => btn.visible);
      });
      
      if (submitButtons.length > 0) {
        const button = submitButtons[0];
        submitSpinner.succeed(successGradient(`Found submit button: "${button.text}"`));
        
        ChaiLogger.action('🚀', `Clicking submit button: "${button.text}" at (${button.x}, ${button.y})`);
        
        const clickSpinner = ora(chaiGradient('Submitting form...')).start();
        await page.mouse.click(button.x, button.y);
        await page.waitForTimeout(2000);
        
        clickSpinner.succeed(successGradient('Form submitted successfully! 🎉'));
        return `Clicked submit button: ${button.text}`;
      } else {
        submitSpinner.fail(errorGradient('No submit button found'));
        return "No submit button found";
      }
    } catch (error) {
      ChaiLogger.error(`Submit failed: ${error.message}`);
      return `Failed to submit form: ${error.message}`;
    }
  },
});

ChaiLogger.success('Agent tools initialized! Ready to brew some automation magic! ☕💻');

const webAutomate = new Agent({
  name: "chai_code_automate",
  model: "gpt-4o-mini",
  tools: [
    openBrowser,
    openUrl,
    screenshot,
    getPageInfo,
    findElementsByText,
    clickOnScreen,
    navigateToPath,
    typeText,
    fillForm,
    submitForm,
  ],
  instructions: `You are the Chai Aur Code automation agent! 🍵💻

Follow these steps with chai precision and code elegance:

1. Open browser using 'open_browser' - Start brewing!
2. Navigate to the provided URL using 'open_url' - Time to visit!
3. Take a screenshot to see the page - Capture the moment!
4. Get page info to confirm URL - Verify our location!
5. Look for "Authentication" or "Sign" text using 'find_elements_by_text' - Hunt for clues!
6. If found, click on those elements. If not, try navigating directly to signup paths
7. Try these paths in order: '/auth/signup', '/signup', '/register' - Explore possibilities!
8. Once on signup page, take screenshot and get page info - Document progress!
9. Fill the form using 'fill_form' - Input magic data!
10. Submit using 'submit_form' - Send it to the universe!
11. Take final screenshot - Celebrate success!

Be methodical, take screenshots after major actions, and remember - we're brewing automation magic with chai aur code! ☕`,
});

ChaiLogger.success('Chai Aur Code Agent created successfully! 🤖✨');

async function chaiAutomation(query) {
  try {
    ChaiLogger.divider();
    ChaiLogger.step('FINAL', 'Starting Chai Aur Code automation journey...');
    console.log(chalk.yellow('📝 Mission:') + ' ' + chalk.white(query));
    ChaiLogger.divider();
    
    const automationSpinner = ora({
      text: chaiGradient('Agent is brewing automation magic...'),
      spinner: 'dots12'
    }).start();
    
    const result = await run(webAutomate, [
      {
        role: "user",
        content: query,
      },
    ], { 
      maxTurns: 30,
      debug: true 
    });
    
    automationSpinner.succeed(successGradient('Automation completed successfully! 🎉'));
    
    console.log('\n' + chaiGradient('🎊 CHAI AUR CODE AUTOMATION COMPLETE! 🎊'));
    ChaiLogger.success('Mission accomplished with chai precision and code elegance!');
    console.log(chalk.yellow('📊 Final result:') + ' ' + chalk.white(JSON.stringify(result, null, 2)));
    
    return result;
  } catch (error) {
    ChaiLogger.error(`Agent execution failed: ${error.message}`);
    console.error(chalk.red('Stack trace:'), error.stack);
  }
}

// Graceful shutdown with chai style
process.on('SIGINT', async () => {
  console.log('\n' + chaiGradient('🛑 Chai break time! Shutting down gracefully...'));
  try {
    const shutdownSpinner = ora(errorGradient('Cleaning up...')).start();
    if (page) await page.close();
    if (browser) await browser.close();
    shutdownSpinner.succeed(successGradient('Browser closed successfully! Thanks for using Chai Aur Code! ☕'));
  } catch (error) {
    ChaiLogger.error(`Error during shutdown: ${error.message}`);
  }
  console.log(chaiGradient('\n👋 Happy coding! Keep brewing amazing things! ☕💻\n'));
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  ChaiLogger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
});

// Start the beautiful automation
ChaiLogger.divider();
console.log(chaiGradient('🚀 Starting Chai Aur Code automation task...'));
ChaiLogger.divider();

// Run the automation with chai style
chaiAutomation(`Navigate to https://ui.chaicode.com and complete the signup process with chai precision! 

🎯 Mission Steps:
1. Open the browser and take a screenshot - Let's see what we're working with!
2. Go to the chaicode website - Time to visit our destination!
3. Find the Authentication section or navigate directly to signup - Hunt for the entry point!
4. Fill out the signup form completely with chai sample data - Input our magical details!
5. Submit the form with confidence - Send it to the digital universe!
6. Confirm success with screenshots - Document our victory!

Be thorough, take screenshots at each major step, and remember - we're brewing automation magic with chai aur code! ☕💻

Happy coding! 🎉`);