Note:  Error My Rate limit exceed for today openai and google also  but this code is working 
### [![Watch the video](https://res.cloudinary.com/dnimidvwh/image/upload/v1756457546/9e0be8c8-cbaf-46a9-9530-573e583e78bc.png)]([https://res.cloudinary.com/dnimidvwh/video/upload/v1756457480/Automated_form_fillup_with_AI_AGENT___google_gemini___AGENTIC_AI_ru6r6p.mp4](https://res.cloudinary.com/dnimidvwh/video/upload/v1756457699/Untitled_design_1_zbopa9.mp4))



# 🍵 Chai Aur Code - Web Automation Magic ✨

> *Brewing automation magic with chai precision and code elegance!*

A beautiful, intelligent web automation script that combines the warmth of chai with the power of code. This tool automates web interactions with style, featuring gorgeous console output and smart form-filling capabilities.

## 🌟 Features

- **🎨 Beautiful CLI Experience**: Stunning gradient console output with chai-themed styling
- **🤖 AI-Powered Automation**: Uses OpenAI agents for intelligent web navigation
- **📝 Smart Form Filling**: Automatically detects and fills common form fields
- **📸 Screenshot Capture**: Visual documentation of automation progress
- **🔍 Element Detection**: Intelligent text-based element finding
- **🛡️ Error Handling**: Robust error management with graceful fallbacks
- **☕ Chai Theme**: Delightful chai-inspired messaging and branding

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- OpenAI API key

### Installation

1. **Clone or download the script**
   ```bash
   # Save the script as web-auto.js
   ```

2. **Install dependencies**
   ```bash
   npm install dotenv @openai/agents playwright zod chalk figlet gradient-string ora
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install chromium
   ```

4. **Set up environment variables**
   Create a `.env` file in your project directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Usage

```bash
node chai-automation.js
```

## 🛠️ Available Tools

The automation agent comes equipped with powerful tools:

| Tool | Description | Usage |
|------|-------------|-------|
| `open_browser` | Launch a new browser instance | Opens Chromium with optimized settings |
| `open_url` | Navigate to any URL | Handles navigation with network idle wait |
| `screenshot` | Capture current page state | Takes PNG screenshots for documentation |
| `get_page_info` | Get current page details | Returns URL and title information |
| `find_elements_by_text` | Search for elements by text content | Intelligent element detection and positioning |
| `click_screen` | Click at specific coordinates | Precise mouse clicking with visual feedback |
| `navigate_to_path` | Navigate to relative paths | Smart path navigation from current domain |
| `type_text` | Type text with natural timing | Simulates human-like typing with delays |
| `fill_form` | Automatically fill form fields | Intelligent form field detection and filling |
| `submit_form` | Submit forms automatically | Finds and clicks submit buttons |

## 🎯 Default Automation Flow

The script includes a pre-configured automation flow for the Chai Code website:

1. **🌐 Browser Setup** - Launch Chromium with optimal settings
2. **📍 Navigation** - Go to https://ui.chaicode.com
3. **🔍 Authentication Hunt** - Search for signup/authentication elements
4. **📝 Form Filling** - Automatically fill signup form with sample data
5. **🚀 Submission** - Submit the completed form
6. **📸 Documentation** - Capture screenshots at each step

## 💾 Sample Data

The script uses these default values for form filling:

```javascript
{
  email: "chai.coder@chaiaurcode.com",
  name: "Chai Aur Code", 
  username: "chaicoder2024",
  password: "ChaiCode@123!",
  phone: "9876543210",
  firstname: "Chai",
  lastname: "Code"
}
```

## 🎨 Console Output

Experience beautiful, themed console output with:

- **🌈 Gradient Text**: Eye-catching color gradients throughout
- **📊 Progress Spinners**: Animated loading indicators for each action
- **✅ Status Updates**: Clear success, error, and info messages
- **🎭 ASCII Art Header**: Stunning figlet-generated title
- **📈 Step Tracking**: Numbered progress tracking

## ⚙️ Configuration

### Browser Settings

The script launches Chromium with these optimized settings:

```javascript
{
  headless: false,           // Visible browser for monitoring
  chromiumSandbox: false,    // Disabled for compatibility
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox", 
    "--disable-dev-shm-usage",
    "--disable-extensions",
    "--no-first-run"
  ]
}
```

### Agent Configuration

- **Model**: `gpt-4o-mini` for efficient AI processing
- **Max Turns**: 30 automation steps
- **Debug Mode**: Enabled for detailed logging
- **Timeout**: 30 seconds for page loads, 15 seconds for navigation

## 🔧 Customization

### Adding New Tools

Create custom tools following this pattern:

```javascript
const customTool = tool({
  name: "custom_action",
  description: "Description of what this tool does",
  parameters: z.object({
    param: z.string(),
  }),
  async execute({ param }) {
    try {
      // Your custom logic here
      ChaiLogger.action('🎯', `Performing custom action with ${param}`);
      // Implementation
      return "Success message";
    } catch (error) {
      ChaiLogger.error(`Custom action failed: ${error.message}`);
      return `Failed: ${error.message}`;
    }
  },
});
```

### Modifying Sample Data

Update the `sampleData` object in the `fillForm` tool:

```javascript
const sampleData = {
  email: "your.email@example.com",
  name: "Your Name",
  username: "yourusername",
  password: "YourPassword123!",
  // Add more fields as needed
};
```

### Changing Target Website

Modify the automation query in the main function call:

```javascript
chaiAutomation(`Navigate to https://your-website.com and complete signup...`);
```

## 🛡️ Error Handling

The script includes comprehensive error handling:

- **Graceful Shutdown**: SIGINT handler for clean browser closure
- **Unhandled Rejections**: Global error catching
- **Timeout Management**: Configurable timeouts for all operations
- **Visual Feedback**: Color-coded error messages with helpful context

## 📋 Dependencies

```json
{
  "dotenv": "Environment variable management",
  "@openai/agents": "AI agent framework", 
  "playwright": "Browser automation",
  "zod": "Schema validation",
  "chalk": "Terminal styling",
  "figlet": "ASCII art text",
  "gradient-string": "Beautiful gradient text",
  "ora": "Elegant terminal spinners"
}
```

## 🎯 Use Cases

Perfect for automating:

- **User Registration Flows** - Signup forms and account creation
- **Form Testing** - Automated form validation testing
- **Demo Scenarios** - Creating demo user accounts
- **QA Testing** - Repetitive testing workflows
- **Data Entry** - Bulk form submissions

## ⚠️ Important Notes

- **Visible Browser**: Runs in non-headless mode for monitoring
- **Rate Limiting**: Be respectful of target websites
- **Data Privacy**: Uses sample data only - modify for production use
- **Network Dependent**: Requires stable internet connection
- **OpenAI Costs**: Uses OpenAI API - monitor usage

## 🤝 Contributing

Want to add more chai-flavored automation magic? 

1. Fork the project
2. Create feature branches with descriptive names
3. Add beautiful console styling for new features
4. Test thoroughly with various websites
5. Submit pull requests with chai enthusiasm!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Playwright Team** - For excellent browser automation
- **OpenAI** - For powerful AI agent capabilities  
- **Chalk & Friends** - For making console output beautiful
- **☕ Chai Community** - For inspiration and warmth

---

<div align="center">

**Made with ☕ and 💻 by the Chai Aur Code community**

*Keep brewing amazing automation! Happy coding!* 🎉

</div>
