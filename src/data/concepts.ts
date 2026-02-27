export type ConceptCategory =
  | "Core CLI"
  | "Intelligence"
  | "Memory"
  | "Automation"
  | "Integration";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface ConceptSection {
  heading: string;
  body: string;
  bullets?: string[];
  code?: {
    language: string;
    content: string;
  };
  screenshots?: {
    src: string;
    alt: string;
  }[];
}

export interface ConceptReference {
  label: string;
  url: string;
  description?: string;
}

export interface Concept {
  slug: string;
  title: string;
  emoji: string;
  category: ConceptCategory;
  difficulty: Difficulty;
  shortDesc: string;
  sections: ConceptSection[];
  released?: boolean;
  references?: ConceptReference[];
}

export const difficultyBadgeStyles: Record<Difficulty, string> = {
  Beginner:     'border-green-500/40 text-green-400 bg-green-500/10',
  Intermediate: 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10',
  Advanced:     'border-red-500/40 text-red-400 bg-red-500/10',
};

export const ALL_CATEGORIES: ConceptCategory[] = [
  "Core CLI",
  "Intelligence",
  "Memory",
  "Automation",
  "Integration",
];

export const concepts: Concept[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    emoji: "🚀",
    category: "Core CLI",
    difficulty: "Beginner",
    released: true,
    shortDesc:
      "Install Claude Code and run your first AI-powered coding session.",
    sections: [
      {
        heading: "Overview",
        body: "Claude Code is Anthropic's official CLI that brings Claude directly into your terminal. It can read files, run commands, edit code, and navigate your entire codebase — all through natural language. You interact with it conversationally, and it takes actions on your behalf with your permission.",
        
      },
      {
        heading: "Installation",
        body: "Claude Code is distributed as an npm package. You need Node.js 18+ and an Anthropic API key. After installing globally, authenticate once and you're ready to use it in any project.",
        code: {
          language: "bash",
          content: `# Install globally
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version

# Start your first session in a project directory
cd my-project
claude`,
        },
        screenshots: [
          { src: "/screenshots/getting-started/Installation.png", alt: "Terminal showing npm install of @anthropic-ai/claude-code and claude --version outputting 2.1.62" },
        ],
      },
      {
        heading: "How It Works",
        body: "When you launch Claude Code, it reads your project context, understands the codebase, and engages in a back-and-forth conversation. You can ask it to explain code, fix bugs, add features, run tests, or even search the web. Claude Code uses a set of tools (file read/write, bash execution, search) to carry out your requests autonomously.",
      },
      {
        heading: "Your First Session",
        body: "Start Claude Code in your project, then try natural language instructions. Claude will read relevant files, understand the context, and take action. You approve or deny each tool call as it runs.",
        code: {
          language: "bash",
          content: `# Open your project
cd my-app
claude

# Then type in the interactive session:
> Explain what this project does
> Fix the TypeScript error in src/auth.ts
> Add a dark mode toggle to the header component
> Run the tests and fix any failures`,
        },
        screenshots: [
          { src: "/screenshots/getting-started/FirstSession.png", alt: "Claude Code interactive session showing natural language instructions and tool call approvals" },
        ],
      },
      {
        heading: "Tips",
        body: 'Be specific and conversational. Claude Code works best when you describe what you want, not how to do it. Start with "What does this file do?" to orient Claude before making changes. Use /help inside a session to see all available slash commands.',
      },
    ],
  },
  {
    slug: "claude-md",
    title: "CLAUDE.md",
    emoji: "📄",
    category: "Memory",
    difficulty: "Intermediate",
    released: true,
    shortDesc:
      "Give Claude persistent project-level instructions via a markdown file.",
    sections: [
      {
        heading: "The /init Command",
        body: "When starting a new project, run /init. Claude scans the codebase, creates a summary, and writes it to CLAUDE.md. This file is then included in every subsequent request. When Claude asks permission: hit Enter to approve each write, or press Shift+Tab to let Claude write files freely.",
        code: {
          language: "bash",
          content: `# In a new project terminal:
> /init

Claude: I'll analyze your codebase to understand its structure
        and create a comprehensive CLAUDE.md file.
        Let me start by exploring the repository...

# Claude then:
# 1. Scans your codebase
# 2. Creates a summary
# 3. Writes it to CLAUDE.md  ← included in every future request

# When prompted to write the file:
# Press Enter        → approve this write
# Press Shift+Tab    → allow Claude to write files freely this session`,
        },
      },
      {
        heading: "CLAUDE.md File Locations",
        body: "Claude recognizes three distinct CLAUDE.md files in three common locations. Each serves a different scope — project-shared, personal, or global across all projects. Below images shows the file locations and their scopes, where the first one is GLOBAL CLAUDE.md file at ~/.claude/CLAUDE.md applying instructions across all projects, and the second one shows CLAUDE.md and CLAUDE.local.md file.",
        code: {
          language: "text",
          content: `CLAUDE.md
  • Generated by /init
  • Committed to source control
  • Shared with all engineers on the team

CLAUDE.local.md (manually created)
  • NOT committed to source control
  • Contains personal instructions and customizations
  • Invisible to other engineers

~/.claude/CLAUDE.md
  • Applies to ALL projects on your machine
  • Contains instructions you want Claude to follow everywhere
  • Your personal global defaults`,
        },

        
        screenshots: [
          { src: "/screenshots/claude-md/Global Claude.png", alt: "Global CLAUDE.md file at ~/.claude/CLAUDE.md applying instructions across all projects" },
          { src: "/screenshots/claude-md/Claude.png", alt: "CLAUDE.md file locations showing project, local, and global scopes" },
        ],
      },
    
      {
        heading: "Tips",
        body: "Use /init at the start of every new project — don't write CLAUDE.md by hand. Put personal preferences in CLAUDE.local.md so teammates aren't affected. Use ~/.claude/CLAUDE.md for habits that apply everywhere (tone, comment style, language preferences).",
      },
    ],
  },
  {
    slug: "cli-commands",
    title: "CLI Commands",
    emoji: "⌨️",
    released: true,
    category: "Core CLI",
    difficulty: "Beginner",
    shortDesc: "Master the full set of CLI flags, modes, and slash commands.",
    sections: [
      {
        heading: "Overview",
        body: "Claude Code has a rich CLI interface with flags for non-interactive mode, piping, model selection, and more. Inside a session, slash commands give you quick access to special behaviors like plan mode, memory management, and session clearing.",
      },
      {
        heading: "Launch Flags",
        body: "Use flags to control how Claude Code starts and behaves. The most important are -p for one-shot (non-interactive) mode, --model to select a Claude model, and --dangerously-skip-permissions for automated environments.",
        code: {
          language: "bash",
          content: `# Start interactive session
claude

# One-shot: print a question, get an answer, exit
claude -p "What does this codebase do?"

# Pipe input to Claude
cat error.log | claude -p "Explain this error"

# Select a specific model
claude --model claude-opus-4-6

# Resume the most recent session
claude --resume

# Continue with a specific session ID
claude --resume <session-id>

# Read-only mode (no file writes or bash execution)
claude --read-only`,
        },
        screenshots: [
          {
            src: "/screenshots/cli-commands/LaunchFlag.png",
            alt: "CLI launch flags in action",
          },
        ],
      },
      {
        heading: "Slash Commands (In-Session)",
        body: "During an interactive session, slash commands let you trigger special behaviors without leaving the conversation. These are typed directly in the Claude Code prompt.",
        code: {
          language: "text",
          content: `/help          — Show all available slash commands
/plan          — Enter plan mode for structured task planning
/compact       — Compress conversation context to free up space
/clear         — Clear conversation history and start fresh
/model         — Switch to a different Claude model mid-session
/memory        — View and manage persistent memory files
/review        — Review recent changes made by Claude
/undo          — Undo the last file change
/tasks         — Show the current task list
/fast          — Toggle fast mode (optimized for speed)
/vim           — Toggle vim keybindings`,
        },
        screenshots: [
          {
            src: "/screenshots/cli-commands/Slash.png",
            alt: "Slash commands in action",
          },
        ],
      },
      {
        heading: "Custom Commands",
        body: "Custom commands let you create your own slash commands by placing markdown files in .claude/commands/. The filename becomes the command name — so audit.md creates /audit. Use the $ARGUMENTS placeholder to accept dynamic input when invoking the command.",
        code: {
          language: "text",
          content: `# Folder structure
.claude/
  commands/
    audit.md        → /audit
    write_tests.md  → /write_tests

# Example: audit.md
Run npm audit to find vulnerable packages, then run npm audit fix to apply updates, then run tests to verify nothing broke.

# Example: write_tests.md (with arguments)
Write comprehensive tests for: $ARGUMENTS

Testing conventions:
* Use Vitest with React Testing Library
* Place test files in a __tests__ directory
* Name test files as [filename].test.ts(x)

# Invoke with arguments
/write_tests the use-auth.ts file in the hooks directory`,
        },
        screenshots: [
          {
            src: "/screenshots/cli-commands/CustomCommand.png",
            alt: "Custom commands in action",
          },
        ],
      },
      {
        heading: "Output & Scripting",
        body: "Claude Code can be embedded in shell scripts and CI pipelines using the -p flag with output formatting options. This enables automated code review, documentation generation, and more.",
        code: {
          language: "bash",
          content: `# Output as JSON for scripting
claude -p "List all API endpoints" --output-format json

# Stream output as it arrives
claude -p "Explain this function" --output-format stream-json

# Use in a git hook
echo "Review this diff for security issues:" | git diff | claude -p`,
        },
      },
      {
        heading: "Tips",
        body: "Use claude -p for automation and scripting without interactive overhead. Use /compact frequently on long sessions to prevent context limits from slowing Claude down. The --resume flag is great for continuing work across terminal restarts.",
      },
    ],
    references: [
      {
        label: "CLI Reference",
        url: "https://code.claude.com/docs/en/cli-reference",
        description: "Complete reference for all CLI commands and flags.",
      },
      {
        label: "Slash Reference",
        url: "https://code.claude.com/docs/en/interactive-mode#built-in-commands",
        description: "Complete reference for all Slash commands.",
      },
    ],
  },
  {
    slug: "keyboard-shortcuts",
    title: "Keyboard Shortcuts",
    emoji: "⚡",
    category: "Core CLI",
    difficulty: "Beginner",
    released: true,
    shortDesc:
      "Navigate and control Claude Code sessions with keyboard shortcuts.",
    sections: [
      {
        heading: "Overview",
        body: "Claude Code has a set of keyboard shortcuts that let you control the conversation flow, submit multi-line inputs, interrupt Claude mid-action, and manage the session efficiently — all without leaving the keyboard.",
      },
      {
        heading: "Essential Shortcuts",
        body: "These are the shortcuts you will use in every session. Shift+Enter is especially important for writing multi-line prompts without accidentally submitting early.",
        code: {
          language: "text",
          content: `Enter          — Submit your message to Claude
Shift+Enter    — Insert a newline (multi-line input)
Ctrl+C         — Interrupt Claude while it is running a tool
Ctrl+D         — Exit the session gracefully (sends EOF)
Ctrl+L         — Clear the terminal screen (keeps context)
Up/Down Arrow  — Navigate through your message history`,
        },
      },
      {
        heading: "Interruption & Control",
        body: "Ctrl+C is your best friend for stopping Claude if it is doing something unexpected. After interruption, Claude reports what it was doing and waits for your next instruction. You can then redirect or undo.",
        code: {
          language: "text",
          content: `# Scenario: Claude is running a long build
> Build the project and run all tests
[Claude starts running: npm run build...]

# Press Ctrl+C to interrupt
^C
Claude: Interrupted. I was running: npm run build
        The build had started but not completed.
        What would you like to do?

> Just run the unit tests, skip the build`,
        },
      },
      {
        heading: "Multi-line Input",
        body: "Use Shift+Enter to write complex, multi-line prompts. This is useful for providing detailed context, pasting code snippets, or writing structured instructions with multiple requirements.",
        code: {
          language: "text",
          content: `> Please make the following changes:    [Shift+Enter]
  1. Add input validation to the login form  [Shift+Enter]
  2. Show error messages below each field    [Shift+Enter]
  3. Disable the submit button while loading [Enter to submit]`,
        },
      },
      {
        heading: "Vim Mode",
        body: "If you are a Vim user, you can enable vim keybindings in the Claude Code input with /vim. This lets you use normal/insert/visual modes for editing your prompt before submitting.",
        code: {
          language: "text",
          content: `# Enable vim mode inside a session
/vim

# Now the input supports:
# Esc      — switch to normal mode
# i        — enter insert mode
# v        — visual mode for selection
# :q       — quit (closes session)
# Standard vim motion keys: hjkl, w, b, 0, $, gg, G`,
        },
      },
      {
        heading: "Rewinding Conversations",
        body: "During long conversations, you might accumulate context that becomes irrelevant or distracting. For instance, if Claude encounters an error and spends time debugging it, that back-and-forth discussion might not be useful for the next task.\n\nYou can rewind the conversation by pressing Escape twice. This shows you all the messages you've sent, allowing you to jump back to an earlier point and continue from there. This technique helps you:",
        bullets: [
          "Maintain valuable context (like Claude's understanding of your codebase)",
          "Remove distracting or irrelevant conversation history",
          "Keep Claude focused on the current task",
        ],
        code: {
          language: "text",
          content: `# Press Escape twice to enter rewind mode
Esc Esc

# Claude shows your message history:
[1] > /init
[2] > Add authentication to the app
[3] > Fix the TypeScript error   ← back-and-forth debugging noise
[4] > Now add the login form

# Select an earlier message to continue from that point
# Claude picks up as if the noisy messages never happened`,
        },
      },
      {
        heading: "Interrupting Claude with Escape",
        body: "Sometimes Claude starts heading in the wrong direction or tries to tackle too much at once. You can press the Escape key to stop Claude mid-response, allowing you to redirect the conversation.\n\nThis is particularly useful when you want Claude to focus on one specific task instead of trying to handle multiple things simultaneously. For example, if you ask Claude to write tests for multiple functions and it starts creating a comprehensive plan for all of them, you can interrupt and ask it to focus on just one function at a time.",
        code: {
          language: "text",
          content: `# Claude starts going too broad:
> Write tests for all the utility functions
[Claude: I'll create a comprehensive test suite covering...]

# Press Escape to interrupt
Esc
Claude: Interrupted.

# Redirect to something narrower:
> Just write tests for the formatDate function first`,
        },
      },
      {
        heading: "Tips",
        body: "Learn Ctrl+C muscle memory early — it's safer to interrupt and redirect than to let Claude continue in a wrong direction. Use the Up arrow to quickly re-send a slightly modified version of your last prompt. Use Esc+Esc (rewind) when a debugging tangent has polluted your context — it's faster than starting a fresh session.",
      },
    ],
  },
  {
    slug: "permission-modes",
    title: "Permission Modes",
    emoji: "🔐",
    category: "Core CLI",
    difficulty: "Intermediate",
    released: true,
    shortDesc:
      "Control what Claude can do automatically vs. what requires your approval.",
    sections: [
      {
        heading: "Overview",
        body: "Claude Code operates with a permission system that controls which tools it can use without explicit user approval. This balances autonomy (getting work done fast) with safety (you stay in control). Understanding permission modes is key to using Claude Code confidently.",
      },
      {
        heading: "Default Mode",
        body: "In default mode, Claude Code prompts you before executing any tool call that could have side effects: writing files, running commands, making network requests. Read operations (file reads, searches) are allowed automatically. This is the safest mode for everyday use.",
        code: {
          language: "text",
          content: `# Default behavior: Claude asks before writing
> Add a README to this project

Claude: I will create README.md with project documentation.
        Allow: Write README.md? [y/n/always/never]
        > y   ← you approve this one action

# Read operations happen automatically
Claude: [reads package.json, src/index.ts, ...] (no prompt)`,
        },
      },
      {
        heading: "Auto-Approve Mode",
        body: 'You can tell Claude to auto-approve specific tools or all tools using the "always" option when prompted, or by configuring it in settings. This speeds up sessions when you trust Claude to work autonomously.',
        code: {
          language: "text",
          content: `# When prompted, choose "always" to auto-approve a tool type
Allow: Write src/utils.ts? [y/n/always/never]
> always    ← all future Write tool calls auto-approved this session

# Or start with auto-permissions flag (for trusted automation)
claude --dangerously-skip-permissions

# Or configure in settings.json
{
  "permissions": {
    "allow": ["Bash(npm run *)", "Write(src/*)", "Read"]
  }
}`,
        },
      },
      {
        heading: "Read-Only Mode",
        body: "Read-only mode restricts Claude to only reading files and searching the codebase — no writes, no bash execution. This is perfect for code review, exploration, and answering questions without risk of changes.",
        code: {
          language: "bash",
          content: `# Start in read-only mode
claude --read-only

# Now Claude can only:
# - Read files
# - Search with Grep/Glob
# - Fetch web content
# But CANNOT:
# - Write or edit files
# - Run bash commands
# - Execute any destructive action`,
        },
      },
      {
        heading: "Permission Rules",
        body: 'Fine-grained permission rules let you allow or deny specific tool patterns. Rules follow a "Tool(pattern)" format and support glob-style matching.',
        code: {
          language: "json",
          content: `// settings.json — fine-grained permission rules
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",        // allow all npm run scripts
      "Bash(git status)",        // allow git status only
      "Write(src/**)",           // allow writes inside src/
      "Read"                     // allow all reads
    ],
    "deny": [
      "Bash(rm *)",              // deny all rm commands
      "Bash(git push *)"         // deny git push
    ]
  }
}`,
        },
      },
      {
        heading: "Tips",
        body: "Start with default mode to build trust, then selectively enable auto-approve for tools you're comfortable with. Use read-only mode when exploring unfamiliar codebases. Never use --dangerously-skip-permissions in production environments.",
      },
    ],
  },
  {
    slug: "settings-json",
    title: "settings.json vs settings.local.json",
    emoji: "⚙️",
    category: "Core CLI",
    difficulty: "Beginner",
    released: true,
    shortDesc:
      "Configure Claude Code globally or per-project, and keep secrets out of version control.",
    sections: [
      {
        heading: "Overview",
        body: "Claude Code uses two layered configuration files to control its behaviour. `settings.json` is the shared project config (committed to git), while `settings.local.json` is a machine-specific override that stays out of version control. Together they let teams share a baseline while each developer keeps their own personal tweaks.",
      },
      {
        heading: "settings.json — Shared Project Config",
        body: "Lives at `.claude/settings.json` inside your project. Commit this file to share consistent tool permissions, hooks, and environment defaults with everyone on the team. Ideal for rules that should apply to all contributors: which tools Claude can auto-approve, custom slash-command hooks, or model preferences.",
        code: {
          language: "json",
          content: `// .claude/settings.json  (committed to git)
{
  "permissions": {
    "allow": ["Bash(npm run *)", "Read", "Write", "Edit"],
    "deny": []
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{ "type": "command", "command": "npm run lint --silent" }]
      }
    ]
  }
}`,
        },
      },
      {
        heading: "settings.local.json — Personal Overrides",
        body: "Lives at `.claude/settings.local.json` and is git-ignored by default. Use it for anything you don't want to share: personal API keys, machine-specific paths, or a wider auto-approve list that suits your own workflow. Settings here are merged on top of `settings.json`, so you only need to specify what you're overriding.",
        screenshots: [
          {
            src: "/screenshots/Setting.png",
            alt: "Claude Code settings.local.json personal overrides",
          },
        ],
        code: {
          language: "json",
          content: `// .claude/settings.local.json  (git-ignored)
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Read",
      "Write",
      "Edit",
      "Bash(npx prisma *)"
    ]
  },
  "env": {
    "MY_PERSONAL_API_KEY": "sk-..."
  }
}`,
        },
      },
      {
        heading: "Merge Order",
        body: "Think of it as three layers stacked on top of each other. Claude Code reads all three files and combines them — the file closest to you (settings.local.json) always wins if the same setting appears in multiple places. Nothing is lost from lower layers; only conflicting keys get overwritten.",
        code: {
          language: "text",
          content: `Layer 1 — Global (applies to every project on your machine)
  ~/.claude/settings.json

    Layer 2 — Project shared (committed, applies to all teammates)
      .claude/settings.json

        Layer 3 — Your local overrides (git-ignored, your machine only)
          .claude/settings.local.json   ← wins on conflict

Example: if Layer 1 allows ["Read"] and Layer 3 allows ["Read", "Write"],
the final result is ["Read", "Write"] — layers add, not replace.`,
        },
      },
      {
        heading: "What Belongs Where",
        body: "A simple rule of thumb: if every team member needs it, put it in `settings.json`. If it's personal, machine-specific, or contains a secret, put it in `settings.local.json`. Never commit API keys or personal access tokens — use the local file or environment variables injected outside Claude Code.",
        code: {
          language: "text",
          content: `settings.json (commit)         settings.local.json (don't commit)
──────────────────────────     ──────────────────────────────────
Shared auto-approve rules      Personal wider permissions
Project lint/format hooks      Personal API keys or tokens
Model preferences for CI       Machine-specific binary paths
Custom slash-command hooks     Dev-only env var overrides`,
        },
      },
      {
        heading: "Tips",
        body: "Add `.claude/settings.local.json` to your global `.gitignore` so it can never be accidentally committed. If you're bootstrapping a new project, start with an empty `settings.json` and let each developer build their own `settings.local.json`. Review your team's `settings.json` in code review just like any other config file — it controls what Claude can do automatically.",
      },
    ],
    references: [
      {
        label: "Claude Code Settings Docs",
        url: "https://docs.anthropic.com/en/docs/claude-code/settings",
        description: "Official reference for all available settings fields.",
      },
    ],
  },
  {
    slug: "plan-vs-think-mode",
    title: "Plan Mode vs Think Mode",
    emoji: "📋",
    category: "Intelligence",
    difficulty: "Intermediate",
    released: true,
    shortDesc:
      "Make Claude plan before acting — get architectural clarity upfront.",
    sections: [
      {
        heading: "Overview",
        body: "Plan mode tells Claude to think through a task and write a structured plan before touching any code. This prevents wasted effort, surfaces ambiguities early, and gives you a chance to redirect before Claude dives into implementation. It's the difference between a junior dev who starts coding immediately and a senior dev who designs first.",
      },
      {
        heading: "Entering Plan Mode",
        body: "Use /plan inside a session to enter plan mode, or explicitly ask Claude to plan before acting. Claude will then write a plan (typically to a tasks/todo.md file) and present it for your approval before proceeding.",
        code: {
          language: "text",
          content: `# Enter plan mode with slash command
> /plan

# Or ask explicitly
> Before writing any code, plan how you would add authentication to this app.
  Think through the architecture, list the files you would change, and identify
  any dependencies we might need.

# Claude responds with a structured plan:
Claude: Here is my plan for adding authentication:

## Approach
Use NextAuth.js with JWT sessions...

## Files to Create
- src/lib/auth.ts         (auth configuration)
- src/app/api/auth/[...nextauth]/route.ts

## Files to Modify
- src/app/layout.tsx      (wrap with SessionProvider)
- src/middleware.ts       (protect routes)

## Steps
1. Install next-auth
2. Configure providers...

Shall I proceed with this plan?`,
        },
      },
      {
        heading: "How It Works",
        body: "In plan mode, Claude uses the ExitPlanMode tool to signal it is ready for approval after writing the plan. You can ask questions, request changes to the plan, or approve it. Only after approval does Claude start making file changes. The plan is typically saved to tasks/todo.md so it persists.",
      },
      {
        heading: "When to Use Plan Mode",
        body: "Use plan mode for any task with 3+ steps, architectural decisions, or when the approach could go multiple ways. Skip it for simple one-line fixes or obvious bug patches.",
        code: {
          language: "text",
          content: `# Use plan mode for:
> Plan how to add dark mode support across the entire app
> Plan a database schema refactor for the user table
> Plan the migration from REST to GraphQL

# Skip plan mode for:
> Fix the typo in README.md
> Add a console.log to debug this function
> Change the button color to blue`,
        },
      },
      {
        heading: "Enabling Planning Mode",
        body: "For more complex tasks that require extensive research across your codebase, you can enable Planning Mode. This feature makes Claude do thorough exploration of your project before implementing changes.\n\nEnable Planning Mode by pressing Shift + Tab twice (or once if you're already auto-accepting edits). In this mode, Claude will:\n\n• Read more files in your project\n• Create a detailed implementation plan\n• Show you exactly what it intends to do\n• Wait for your approval before proceeding\n\nThis gives you the opportunity to review the plan and redirect Claude if it missed something important or didn't consider a particular scenario.",
        code: {
          language: "text",
          content: `# Activate planning mode:
Shift + Tab  (press twice from default mode)
Shift + Tab  (press once if auto-accepting edits)

# Claude enters plan mode and will:
# 1. Explore your codebase thoroughly
# 2. Write a structured plan to tasks/todo.md
# 3. Present the plan for your review
# 4. Wait for approval before writing any code

> Refactor the authentication system to use JWT
[Claude reads 12 files, identifies 4 affected components...]
[Claude writes plan — awaiting your approval]`,
        },
        screenshots: [
          { src: "/screenshots/plan-vs-think-mode/Plan.png", alt: "Plan mode in action" },
        ],
      },
      {
        heading: "Thinking Modes",
        body: "Claude offers different levels of reasoning through \"thinking\" modes. These allow Claude to spend more time reasoning about complex problems before providing solutions. Each mode gives Claude progressively more tokens to work with, allowing for deeper analysis of challenging problems.",
        bullets: [
          "\"Think\" - Basic reasoning",
          "\"Think more\" - Extended reasoning",
          "\"Think a lot\" - Comprehensive reasoning",
          "\"Think longer\" - Extended time reasoning",
          "\"Ultrathink\" - Maximum reasoning capability",
        ],
        code: {
          language: "text",
          content: `# Use thinking modes by including them in your prompt:

> Think about the best architecture for this feature
> Think more about potential edge cases in this logic
> Think a lot about how to refactor this without breaking tests
> Ultrathink about the security implications of this approach

# When to use each:
# "Think"      → Simple decisions, quick tradeoff analysis
# "Think more" → Design decisions, debugging hard bugs
# "Think a lot" → Architecture changes, complex refactors
# "Ultrathink"  → Security reviews, critical system design`,
        },
      },
      {
        heading: "Tips",
        body: "Ask Claude to include file counts, estimated complexity, and potential risks in its plans. If a plan looks too complex, ask it to find a simpler approach. A good plan prevents 80% of rework — invest time here. Use Ultrathink sparingly — it consumes significantly more tokens but is worth it for high-stakes decisions.",
      },
    ],
  },
  {
    slug: "tool-use",
    title: "Tool Use",
    emoji: "🛠️",
    category: "Intelligence",
    difficulty: "Intermediate",
    released: true,
    shortDesc: "Understand the tools Claude uses to interact with your system.",
    sections: [
      {
        heading: "Overview",
        body: "Claude Code's power comes from its tools — specialized capabilities that let it interact with your filesystem, terminal, browser, and more. When you give Claude an instruction, it selects and uses tools to accomplish the task. Understanding these tools helps you predict what Claude will do and how to guide it effectively.",
      },
      {
        heading: "File System Tools",
        body: "The most frequently used tools are for reading and writing files. Claude uses Read to understand code, Glob to find files by pattern, Grep to search content, Write to create new files, and Edit to make targeted changes.",
        code: {
          language: "text",
          content: `Read          — Read a file (shows line numbers, respects limits)
Write         — Create or overwrite a file entirely
Edit          — Make exact string replacements in a file
Glob          — Find files matching a pattern (e.g., "**/*.ts")
Grep          — Search file contents with regex

# Example tool calls Claude makes internally:
Read: src/components/Button.tsx
Glob: src/**/*.test.ts
Grep: pattern="useState", path="src/", type="ts"
Edit: old="const x = 1" new="const x = 2" in Button.tsx`,
        },
      },
      {
        heading: "Execution Tools",
        body: "The Bash tool lets Claude run shell commands: install packages, run tests, start servers, execute scripts. This is the most powerful (and potentially risky) tool, which is why it always requires permission by default.",
        code: {
          language: "bash",
          content: `# Claude uses Bash tool for:
npm install         # Install dependencies
npm run test        # Run tests
git status          # Check git state
git add . && git commit -m "..."  # Commit changes
ls src/components/  # List files
curl https://...    # Fetch URLs`,
        },
      },
      {
        heading: "Intelligence Tools",
        body: "Claude has meta-tools for managing its own workflow: Task (spawn subagents), TodoWrite/TodoRead (task lists), WebSearch and WebFetch (internet access), and specialized tools like NotebookEdit for Jupyter notebooks.",
        code: {
          language: "text",
          content: `Task          — Spawn a subagent for a specialized sub-task
WebSearch     — Search the web for current information
WebFetch      — Fetch and read a specific URL
TodoWrite     — Write structured task checklists
TodoRead      — Read the current task list
NotebookEdit  — Edit Jupyter notebook cells
mcp__*        — Tools from connected MCP servers`,
        },
      },
      {
        heading: "How Claude Selects Tools",
        body: 'Claude picks tools based on what the task requires. For "read this file", it uses Read. For "find all files with this pattern", it uses Glob. For "run the tests", it uses Bash. Claude prefers dedicated tools over Bash when available, as dedicated tools provide better user experience and auditability.',
      },
      {
        heading: "Tips",
        body: 'You can guide tool selection by being specific: "search for the function definition" (Grep) vs "list files in the components folder" (Glob/Bash). Watch the tool calls Claude makes to understand how it reasons about your codebase.',
      },
    ],
  },
  {
    slug: "extended-thinking",
    title: "Extended Thinking",
    emoji: "🧠",
    category: "Intelligence",
    difficulty: "Advanced",
    released: true,
    shortDesc:
      "Enable deep reasoning for complex architectural and algorithmic problems.",
    sections: [
      {
        heading: "Overview",
        body: 'Extended Thinking is a Claude capability that allocates additional "thinking tokens" — internal reasoning steps that Claude works through before giving its final answer. This dramatically improves performance on hard problems: algorithm design, complex debugging, architectural trade-offs, and mathematical reasoning. The thinking is visible to you as a scratchpad.',
      },
      {
        heading: "When It Activates",
        body: "Extended thinking activates automatically when Claude determines a problem is complex enough to warrant it, or when you explicitly ask Claude to think deeply. It is most valuable for problems where the naive answer might be wrong or where multiple approaches need careful evaluation.",
        code: {
          language: "text",
          content: `# These prompts tend to trigger extended thinking:
> Think carefully about the best architecture for this feature
> I need you to deeply analyze the security implications here
> What is the most efficient algorithm for this problem?
> Think step by step through all the edge cases

# Or explicitly enable via API:
{
  "thinking": {
    "type": "enabled",
    "budget_tokens": 10000   // up to 16,000 tokens of thinking
  }
}`,
        },
      },
      {
        heading: "How It Works",
        body: "During extended thinking, Claude produces a <thinking> block where it reasons freely — exploring wrong paths, backtracking, reconsidering. This scratchpad is separate from the final answer. The final response reflects the conclusions of that reasoning process. You can see the thinking in Claude Code's output.",
      },
      {
        heading: "Use Cases",
        body: "Extended thinking shines for: debugging complex race conditions, designing a system from scratch, refactoring large codebases, writing complex SQL/regex, and understanding unfamiliar code patterns. It is less useful for simple CRUD operations or trivial edits.",
        code: {
          language: "text",
          content: `# Good use cases:
> Think through how to refactor this 500-line function
  into maintainable pieces without breaking behavior

> Analyze why this async function has a race condition
  and design the fix carefully

> I need a regex that matches ISO dates but not invalid
  dates like Feb 30. Think through all the cases.

# Not worth extended thinking:
> Add a semicolon to line 42
> Rename this variable to camelCase`,
        },
      },
      {
        heading: "Tips",
        body: 'Ask Claude to "think carefully" or "think step by step" to encourage deeper reasoning without necessarily hitting full extended thinking mode. For API usage, set a generous budget_tokens (8000+) for truly hard problems. Extended thinking uses more tokens and is slower — use it deliberately.',
      },
    ],
  },
  {
    slug: "auto-memory",
    title: "Auto Memory",
    emoji: "🗂️",
    category: "Memory",
    difficulty: "Intermediate",
    released: true,
    shortDesc:
      "Persist knowledge across sessions with Claude's auto memory system.",
    sections: [
      {
        heading: "Overview",
        body: "Auto Memory gives Claude Code a persistent memory directory where it can save and retrieve information across sessions. Unlike conversation context (which resets each session), memory files persist indefinitely. Claude uses them to remember user preferences, architectural decisions, debugging insights, and patterns learned from corrections.",
        screenshots: [
          { src: "/screenshots/auto-memory/MemoryWork.png", alt: "How auto memory works" },
        ],
      },
      {
        heading: "How Are Memories Stored?",
        body: "There are three ways memories get written:",
        bullets: [
          "Automatically during the session by Claude",
          'Manually via /memory (similar to CLAUDE.md) or by directly editing the file',
          'When triggered by the user — "remember that ___"',
        ],
        code: {
          language: "text",
          content: `> Remember that we like files in this project named this way.
● Recalled 1 memory, wrote 1 memory`,
        },
        screenshots: [
          { src: "/screenshots/auto-memory/MemoryRemember.png", alt: "Claude remembering a user instruction" },
        ],
      },
      {
        heading: "Memory Directory",
        body: "Claude Code creates a memory directory per project under your home directory. The main file is MEMORY.md, which is always loaded into context — but only the first 200 lines are read; anything beyond that is truncated. Additional topic-specific files can be created and linked from MEMORY.md for detailed notes.",
        code: {
          language: "text",
          content: `# Memory directory location:
~/.claude/projects/<project-path>/memory/

# Files in memory:
MEMORY.md           ← always loaded (keep under 200 lines)
debugging.md        ← linked from MEMORY.md for details
patterns.md         ← code patterns and conventions
architecture.md     ← key architectural decisions`,
        },
        screenshots: [
          { src: "/screenshots/auto-memory/MemoryLocation.png", alt: "Memory directory location" },
          { src: "/screenshots/auto-memory/AutoMemory.png", alt: "Auto memory in action" },
        ],
      },
      {
        heading: "What Gets Saved",
        body: "Claude saves stable patterns confirmed across multiple interactions, user preferences, key file paths, solutions to recurring problems, and lessons from corrections. It avoids saving session-specific or speculative information.",
        code: {
          language: "markdown",
          content: `# Example MEMORY.md content

## Project: claude-learning-app
Next.js 16, React 19, Tailwind CSS 4 (not Tailwind 3).
searchParams is a Promise in Next.js 15+ — always await it.

## User Preferences
- User prefers concise responses, no emojis
- Always run lint before declaring done
- User uses bun, not npm for package management

## Key File Paths
- Data: src/data/concepts.ts
- Components: src/components/
- API routes: src/app/api/

## Recurring Patterns
- Use "use client" directive for interactive components
- CategoryFilter uses URL search params, not useState`,
        },
      },
      {
        heading: "Managing Memory",
        body: "Use /memory inside a session to view and manage memory files. You can ask Claude to remember or forget specific things. Memory is organized semantically by topic, not chronologically.",
        code: {
          language: "text",
          content: `# Inside a Claude Code session:
> /memory                     ← view current memory
> Remember to always use bun instead of npm
> Forget the note about the old database schema
> Update the architecture memory with the new API structure`,
        },
        screenshots: [
          { src: "/screenshots/auto-memory/Memory.png", alt: "Managing memory in Claude Code" },
        ],
      },
      {
        heading: "Tips",
        body: "Keep MEMORY.md under 200 lines — content beyond that gets truncated. Link to detailed topic files for long-form notes. Ask Claude to review its memory at the start of complex sessions to ensure it's working from accurate context.",
      },
    ],
  },
  {
    slug: "context-management",
    title: "Context Management",
    emoji: "🔄",
    category: "Memory",
    difficulty: "Intermediate",
    released: true,
    shortDesc:
      "Manage Claude's context window to maintain performance on long sessions.",
    sections: [
      {
        heading: "Overview",
        body: "Claude has a finite context window — the total amount of text (conversation history, file contents, tool results) it can hold at once. As sessions grow longer, the context fills up, causing slower responses and eventual truncation. Understanding context management keeps Claude sharp throughout long coding sessions.",
      },
      {
        heading: "Context Limits",
        body: "Claude's context window is measured in tokens (roughly 4 characters per token). Claude Code automatically tracks context usage and warns you when approaching limits. Different Claude models have different context sizes.",
        code: {
          language: "text",
          content: `# Claude models and approximate context sizes:
claude-opus-4-6     — 200,000 tokens (~150,000 words)
claude-sonnet-4-6   — 200,000 tokens (~150,000 words)
claude-haiku-4-5    — 200,000 tokens (~150,000 words)

# Context is consumed by:
- Conversation history (every message both ways)
- File contents read by Claude
- Tool call results (bash output, search results)
- System prompts (CLAUDE.md, memory files)`,
        },
      },
      {
        heading: "The /compact Command",
        body: "/compact is your primary tool for managing context. It summarizes the conversation history into a compact form, freeing up space while preserving the key information Claude needs to continue working. Use it proactively before context runs low.",
        code: {
          language: "text",
          content: `# Inside a session, when context is getting full:
> /compact

Claude: Compacting conversation history...
[Summarizes 50 messages into a brief summary]
Context freed: ~45,000 tokens

# You can also compact with a specific focus:
> /compact Focus on the authentication work we did,
  keep the file structure summary`,
        },
      },
      {
        heading: "Best Practices",
        body: "Start new sessions for new tasks instead of extending old ones indefinitely. Use /compact before switching to a different part of the codebase. Avoid asking Claude to read very large files unnecessarily — ask it to read specific sections instead.",
        code: {
          language: "text",
          content: `# Instead of reading a huge file:
> Read src/legacy-monolith.ts       ← reads 5,000 lines

# Read only what you need:
> Read lines 100-150 of src/legacy-monolith.ts
> Search for the UserAuthService class definition
> What does the validateToken function do in auth.ts?`,
        },
      },
      {
        heading: "Tips",
        body: "Run /compact after completing each major task in a long session. Watch for Claude's responses becoming vaguer or less precise — this can be a sign of context pressure. Starting fresh sessions costs context on CLAUDE.md re-loading but avoids stale conversation clutter.",
      },
    ],
  },
  {
    slug: "prompt-caching",
    title: "Prompt Caching",
    emoji: "⚡",
    category: "Memory",
    difficulty: "Advanced",
    released: true,
    shortDesc:
      "Reduce API costs and latency by caching repeated context prefixes.",
    sections: [
      {
        heading: "Overview",
        body: "Prompt caching is an Anthropic API feature that lets you cache the beginning (prefix) of a prompt so subsequent requests reuse the cached version instead of reprocessing it. This reduces costs by up to 90% and cuts latency significantly for requests that share a common prefix — like a large system prompt, codebase context, or document.",
      },
      {
        heading: "How It Works",
        body: "You mark cache breakpoints in your prompt using the cache_control parameter. Anthropic's infrastructure caches the KV (key-value) attention states up to that point. Subsequent requests with the same prefix up to a breakpoint hit the cache instead of recomputing from scratch.",
        code: {
          language: "python",
          content: `import anthropic

client = anthropic.Anthropic()

# Large system prompt that stays constant across many requests
LARGE_CODEBASE_CONTEXT = "..." * 10000  # 50k tokens of context

response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": LARGE_CODEBASE_CONTEXT,
            "cache_control": {"type": "ephemeral"}  # ← cache this prefix
        }
    ],
    messages=[
        {"role": "user", "content": "What does the auth module do?"}
    ]
)

# Usage shows cache performance:
print(response.usage.cache_creation_input_tokens)  # first request
print(response.usage.cache_read_input_tokens)       # subsequent requests`,
        },
      },
      {
        heading: "Cache Lifetime",
        body: "Ephemeral caches last for 5 minutes by default (extendable). Each cache hit resets the timer. Caches are invalidated if the cached prefix changes at all — even a single character difference means a cache miss. Plan your system prompts to have stable prefixes.",
        code: {
          language: "python",
          content: `# Good: stable prefix, variable content comes after cache point
messages = [
    {
        "type": "text",
        "text": "You are an expert code reviewer. [Large stable instructions...]",
        "cache_control": {"type": "ephemeral"}   # ← cache this
    },
    {
        "type": "text",
        "text": f"Review this code: {user_submitted_code}"  # ← not cached, varies
    }
]

# Bad: variable content before the cache point (kills cache hits)
messages = [
    {
        "type": "text",
        "text": f"Today is {datetime.now()}. [Large stable instructions...]",
        "cache_control": {"type": "ephemeral"}  # ← never hits cache!
    }
]`,
        },
      },
      {
        heading: "When to Use",
        body: "Prompt caching is most valuable when: the same large context is used across many requests (document QA, codebase chat), you have a large stable system prompt, or you're running batch operations over the same data.",
        code: {
          language: "text",
          content: `# Great use cases for prompt caching:
- Chat over a large PDF document (cache the document)
- Codebase-aware coding assistant (cache the full codebase)
- Repeated analysis with same rules (cache the rule set)
- Multi-turn conversations with stable system prompts

# Cost comparison (approximate):
# Without cache:  $0.015 per 1K input tokens (Sonnet 4.6)
# Cache creation: $0.019 per 1K tokens (25% premium)
# Cache reads:    $0.0015 per 1K tokens (90% discount!)`,
        },
      },
      {
        heading: "Tips",
        body: "Put the most stable content earliest in your prompt — static instructions, documents, codebases — and dynamic content last. Use multiple cache breakpoints to cache different layers. Monitor cache_read_input_tokens in usage stats to verify caching is working.",
      },
    ],
  },
  {
    slug: "subagents",
    title: "Subagents & Task Tool",
    emoji: "🤖",
    category: "Automation",
    difficulty: "Advanced",
    released: true,
    shortDesc:
      "Spawn specialized subagents for parallel, isolated, and focused tasks.",
    sections: [
      {
        heading: "Overview",
        body: "The Task tool lets Claude spawn subagents — independent Claude instances that handle specific subtasks autonomously. Subagents have their own context, tools, and execution scope. They're perfect for parallel work, isolating expensive research from the main context, and delegating specialized tasks to optimized agent types.",
      },
      {
        heading: "The Task Tool",
        body: "Claude uses the Task tool internally to create subagents. When building Claude applications with the Agent SDK or API, you can build multi-agent systems where agents spawn and coordinate other agents.",
        code: {
          language: "python",
          content: `# Using Claude\'s Agent SDK to create subagent workflows
import anthropic

client = anthropic.Anthropic()

# Spawn a research subagent from your main agent
response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=4096,
    tools=[
        {
            "name": "run_research_agent",
            "description": "Spawn a specialized research agent",
            "input_schema": {
                "type": "object",
                "properties": {
                    "task": {"type": "string"},
                    "context": {"type": "string"}
                }
            }
        }
    ],
    messages=[{"role": "user", "content": "Research best auth patterns for Next.js"}]
)`,
        },
      },
      {
        heading: "Subagent Types in Claude Code",
        body: "Claude Code has built-in specialized subagent types: general-purpose (full tools access), Explore (codebase exploration), Plan (architecture planning), claude-code-guide (Claude Code documentation), and statusline-setup. Each is optimized for its domain.",
        code: {
          language: "text",
          content: `# Built-in subagent types:
general-purpose  — Full tool access, multi-step autonomous tasks
Explore          — Fast codebase search and analysis
Plan             — Software architecture and implementation planning
claude-code-guide — Claude Code feature documentation Q&A
statusline-setup  — Configure Claude Code status line

# Example: Claude might internally spawn:
Task(subagent_type="Explore",
     prompt="Find all API route handlers in src/app/api/")

Task(subagent_type="Plan",
     prompt="Design the authentication system architecture")`,
        },
      },
      {
        heading: "Parallel Execution",
        body: "Subagents can run in parallel — Claude can launch multiple subagents simultaneously for independent tasks, dramatically speeding up complex workflows. Foreground agents block until complete; background agents run asynchronously.",
        code: {
          language: "text",
          content: `# Claude might run these subagents in parallel:
[Subagent 1] Explore: Find all components using useState
[Subagent 2] Explore: Find all API routes in the project
[Subagent 3] Explore: Find all TypeScript errors

# Background agent (non-blocking):
Task(run_in_background=True,
     prompt="Run all tests and report failures")

# Main agent continues other work while subagent runs...
# Gets notified when background agent completes`,
        },
      },
      {
        heading: "Worktree Isolation",
        body: "Subagents can run in isolated git worktrees — temporary branches where they can make changes without affecting the main working directory. Useful for exploratory code changes that may or may not be kept.",
        code: {
          language: "text",
          content: `# Subagent with git worktree isolation:
Task(
    isolation="worktree",
    prompt="Try refactoring the auth module and see if tests pass"
)
# Claude creates a temporary branch, subagent makes changes
# If changes are good → merge; if not → discard
# Main working directory stays clean throughout`,
        },
      },
      {
        heading: "Tips",
        body: "Subagents have clean context (no conversation history), so provide complete context in the prompt. Use Explore subagents to protect the main context window from large search results. Run independent research tasks in parallel for speed.",
      },
    ],
  },
  {
    slug: "hooks",
    title: "Hooks System",
    emoji: "🪝",
    category: "Automation",
    difficulty: "Advanced",
    released: true,
    shortDesc:
      "Run shell commands automatically before or after Claude's tool calls.",
    sections: [
      {
        heading: "Overview",
        body: "Hooks are shell commands that Claude Code runs automatically in response to specific events — before a tool runs (PreToolUse), after a tool runs (PostToolUse), when the session ends, or when you submit a message. They're configured in your Claude Code settings and enable powerful automation, validation, and guardrails.",
      },
      {
        heading: "Hook Events",
        body: "Claude Code supports several lifecycle events for hooks. The most important are PreToolUse (before any tool runs) and PostToolUse (after any tool runs). Hooks can inspect the tool input/output and optionally block the tool from running.",
        code: {
          language: "json",
          content: `// settings.json — configuring hooks
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'About to run bash: $CLAUDE_TOOL_INPUT' >> ~/.claude/audit.log"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $CLAUDE_TOOL_OUTPUT_FILE 2>/dev/null || true"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code session ended'"
          }
        ]
      }
    ]
  }
}`,
        },
      },
      {
        heading: "Hook Input & Output",
        body: "Hooks receive context about the tool call via environment variables and stdin (as JSON). They can communicate back to Claude by writing to stdout. A non-zero exit code from a hook blocks the tool from running and shows the hook's stderr to the user.",
        code: {
          language: "bash",
          content: `#!/bin/bash
# Example PreToolUse hook script: block dangerous rm commands

# Input arrives as JSON on stdin
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

# Check for dangerous patterns
if echo "$COMMAND" | grep -qE "rm -rf /|DROP TABLE|DELETE FROM.*WHERE 1=1"; then
  echo "BLOCKED: Dangerous command detected: $COMMAND" >&2
  exit 1   # Non-zero exit blocks the tool call
fi

# Add audit log entry
echo "$(date): $COMMAND" >> ~/.claude/bash-audit.log
exit 0   # Zero exit allows the tool call to proceed`,
        },
      },
      {
        heading: "Common Use Cases",
        body: "Hooks enable a wide range of automation: auto-formatting files after Claude writes them, running tests after code changes, auditing all bash commands, blocking dangerous operations, sending notifications, and enforcing team coding standards.",
        code: {
          language: "json",
          content: `// Practical hooks configuration
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{
          "type": "command",
          // Auto-lint TypeScript files after Claude writes them
          "command": "FILE=$(echo $CLAUDE_TOOL_INPUT | jq -r '.file_path'); [[ $FILE == *.ts || $FILE == *.tsx ]] && npx eslint --fix $FILE 2>/dev/null; true"
        }]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          // Warn on git push
          "command": "echo $CLAUDE_TOOL_INPUT | jq -r '.command' | grep -q 'git push' && echo 'Warning: About to push to remote' || true"
        }]
      }
    ]
  }
}`,
        },
      },
      {
        heading: "Tips",
        body: "Start with simple logging hooks before building complex blocking logic. Use hooks for cross-cutting concerns (formatting, linting, auditing) rather than task-specific logic. Make hooks idempotent — they may run multiple times. Always handle hook failures gracefully with `|| true` to avoid blocking Claude unnecessarily.",
      },
    ],
  },
  {
    slug: "skills",
    title: "Skills System",
    emoji: "🎯",
    category: "Automation",
    difficulty: "Intermediate",
    released: true,
    shortDesc:
      "Create custom slash commands that expand into full prompts for repeated workflows.",
    sections: [
      {
        heading: "Overview",
        body: "Skills are custom slash commands you define for Claude Code. Each skill maps a short command (like /commit or /review-pr) to a detailed prompt that gets expanded when the command is invoked. They're stored as markdown files and can be shared across your team. Skills eliminate the need to retype complex, repeated instructions.",
      },
      {
        heading: "Creating a Skill",
        body: "Skills are markdown files stored in ~/.claude/skills/ (user-wide) or .claude/skills/ (project-specific). The filename becomes the command name. The file content is the prompt that gets expanded.",
        code: {
          language: "bash",
          content: `# Create a project-specific skill:
mkdir -p .claude/skills

# Create a skill file:
cat > .claude/skills/commit.md << 'EOF'
Create a git commit following these steps:

1. Run \`git status\` to see all changes
2. Run \`git diff\` to review what changed
3. Write a commit message in this format:
   - First line: imperative mood, under 72 chars
   - Body: explain WHY not WHAT
   - Footer: Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
4. Stage appropriate files (never .env or secrets)
5. Commit and verify with git status
EOF

# Now use it:
claude
> /commit`,
        },
      },
      {
        heading: "Using Skills",
        body: "Invoke skills with the slash command syntax: /skill-name. You can also pass arguments after the command name. Claude Code expands the skill's markdown content into a full prompt and executes it.",
        code: {
          language: "text",
          content: `# Invoke built-in and custom skills:
/commit              ← run your commit skill
/review-pr 123       ← review PR #123
/deploy staging      ← deploy to staging environment
/test auth           ← run auth-related tests

# Skills can receive arguments via $ARGUMENTS:
# In your skill file, use $ARGUMENTS to reference them
# Example skill content:
"Review PR #$ARGUMENTS for security issues and code quality..."`,
        },
      },
      {
        heading: "Skill File Structure",
        body: "A skill file is just markdown — but it's a detailed prompt. Good skills include context about the task, step-by-step instructions, quality standards, and what to output at the end.",
        code: {
          language: "markdown",
          content: `# .claude/skills/review-pr.md

Review the pull request #$ARGUMENTS.

Steps:
1. Run \`gh pr view $ARGUMENTS\` to get PR details
2. Run \`gh pr diff $ARGUMENTS\` to see all changes
3. Analyze for:
   - Security vulnerabilities (OWASP Top 10)
   - Performance issues
   - Missing error handling
   - TypeScript type safety
   - Test coverage gaps

Output a structured review with:
- Summary (1 paragraph)
- Issues Found (severity: critical/major/minor)
- Suggested Improvements
- Overall assessment (approve/request changes)`,
        },
      },
      {
        heading: "Tips",
        body: "Create skills for any workflow you repeat more than twice. Store project skills in .claude/skills/ and commit them to git so the whole team benefits. User-level skills in ~/.claude/skills/ apply across all your projects. Keep skill prompts specific and detailed — vague skills produce vague results.",
      },
    ],
  },
  {
    slug: "worktrees",
    title: "Worktrees",
    emoji: "🌳",
    category: "Automation",
    difficulty: "Advanced",
    released: true,
    shortDesc:
      "Isolate experimental changes in git worktrees for safe parallel development.",
    sections: [
      {
        heading: "Overview",
        body: "Git worktrees let you check out multiple branches simultaneously in separate directories. Claude Code integrates with worktrees to give subagents isolated environments for experimental changes — they can write, edit, and test without touching your main working directory. If the experiment works, you merge; if not, you discard.",
      },
      {
        heading: "What Are Worktrees?",
        body: "A git worktree is an additional working directory linked to the same git repository. Each worktree has its own branch checked out independently. Claude Code creates worktrees in .claude/worktrees/ and automatically cleans them up.",
        code: {
          language: "bash",
          content: `# Git worktrees basics:
git worktree list                   # show all worktrees
git worktree add ../feature-branch feature-branch  # add worktree
git worktree remove ../feature-branch              # remove worktree

# Claude Code creates them automatically in:
.claude/worktrees/<name>/

# Each worktree is a full checkout:
.claude/worktrees/
├── refactor-auth/      ← branch: claude/refactor-auth
│   └── [full project copy checked out here]
└── experiment-1/       ← branch: claude/experiment-1
    └── [another full project copy]`,
        },
      },
      {
        heading: "Using Worktrees in Claude Code",
        body: "Use the /worktree command inside Claude Code to create an isolated environment for the current session. The session's working directory switches to the worktree. Changes are isolated on a new branch.",
        code: {
          language: "text",
          content: `# Inside Claude Code session:
> /worktree my-experiment

[Claude creates a new worktree branch: claude/my-experiment]
[Session working directory switches to .claude/worktrees/my-experiment/]

> Now try refactoring the authentication module and see if all tests pass

[Claude makes changes only in the worktree branch]
[Main branch and working directory are untouched]

# When done:
> The refactoring looks good, merge it into main
[Claude merges the worktree branch back]

# Or discard:
> Actually, let's abandon this approach
[Worktree is removed, no changes to main branch]`,
        },
      },
      {
        heading: "Worktree Isolation for Subagents",
        body: "Subagents can be launched with worktree isolation, getting their own temporary branch. This is used for exploratory tasks where you want to evaluate changes before committing to them.",
        code: {
          language: "text",
          content: `# In Claude Code, subagents with worktree isolation:
Task(
    isolation="worktree",
    prompt="Try converting all class components to hooks and verify tests pass"
)

# What happens:
# 1. Claude creates .claude/worktrees/<random-name>/
# 2. Subagent checks out a new branch there
# 3. Subagent makes all changes in isolation
# 4. If tests pass → report success, offer to merge
# 5. If tests fail → report failure, discard worktree
# 6. Main working directory untouched throughout`,
        },
      },
      {
        heading: "Tips",
        body: "Use worktrees for risky refactors, large feature work, or any experiment you might want to discard. Worktrees require more disk space (full checkout per worktree). Clean up old worktrees with git worktree prune. Worktrees are most valuable when combined with subagents for truly autonomous experimentation.",
      },
    ],
  },
  {
    slug: "mcp",
    title: "MCP (Model Context Protocol)",
    emoji: "🔌",
    category: "Integration",
    difficulty: "Advanced",
    released: true,
    shortDesc:
      "Connect Claude to external tools, databases, and services via MCP servers.",
    sections: [
      {
        heading: "Overview",
        body: "Model Context Protocol (MCP) is an open standard that lets Claude connect to external tools and data sources through local or remote servers. MCP servers expose tools, resources, and prompts that Claude can use just like built-in tools. This lets you connect Claude to databases, APIs, browsers, Jira, Slack, GitHub, and anything else you can write a server for.",
      },
      {
        heading: "MCP Architecture",
        body: "MCP follows a client-server architecture. Claude Code is the MCP client; MCP servers run locally or remotely and expose capabilities. Communication happens over stdio (local) or HTTP/SSE (remote). Claude discovers available tools from connected servers and can use them transparently.",
        code: {
          language: "text",
          content: `MCP Architecture:

┌─────────────────────────────────────────┐
│              Claude Code                │
│  (MCP Client)                           │
│  - Discovers tools from servers         │
│  - Calls mcp__server__tool_name()       │
└────────────┬────────────────────────────┘
             │ stdio / HTTP+SSE
    ┌────────┴──────────────────────┐
    │          MCP Servers          │
    ├───────────────────────────────┤
    │  filesystem    — file access  │
    │  github        — GitHub API   │
    │  postgres      — DB queries   │
    │  browsertools  — browser ctrl │
    │  slack         — messaging    │
    │  your-server   — custom tools │
    └───────────────────────────────┘`,
        },
      },
      {
        heading: "Configuring MCP Servers",
        body: "Add MCP servers to your Claude Code settings. They can be project-specific (.claude/settings.json) or user-wide (~/.claude/settings.json). Each server has a name, command to start it, and optional arguments.",
        code: {
          language: "json",
          content: `// .claude/settings.json — MCP server configuration
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/files"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}`,
        },
      },
      {
        heading: "Writing an MCP Server",
        body: "MCP servers can be written in any language with an MCP SDK (TypeScript, Python, Go, Rust). A server defines tools (callable functions), resources (readable data), and prompts (reusable templates).",
        code: {
          language: "typescript",
          content: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

// Register a tool Claude can call
server.tool(
  "query_database",
  "Run a read-only SQL query against the production DB",
  {
    query: z.string().describe("The SQL SELECT query to run"),
  },
  async ({ query }) => {
    const result = await db.execute(query);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);`,
        },
      },
      {
        heading: "Tips",
        body: "Start with official MCP servers from the Model Context Protocol GitHub org — they cover filesystem, GitHub, Postgres, Slack, and more. MCP tools appear in Claude as mcp__servername__toolname. Use project-level MCP configs for project-specific integrations and user-level for global tools like GitHub.",
      },
    ],
  },
  {
    slug: "settings",
    title: "Settings & Configuration",
    emoji: "⚙️",
    category: "Integration",
    difficulty: "Intermediate",
    released: true,
    shortDesc:
      "Configure Claude Code behavior through settings files at user and project level.",
    sections: [
      {
        heading: "Overview",
        body: "Claude Code is configured through settings.json files. There are two levels: user-level (~/.claude/settings.json) which applies to all projects, and project-level (.claude/settings.json) which overrides user settings for a specific project. Settings control permissions, MCP servers, hooks, models, and more.",
      },
      {
        heading: "Settings File Locations",
        body: "Settings cascade from user to project level. Project settings override user settings. This lets you set global defaults (preferred model, audit hooks) at the user level and project-specific overrides (different permissions, project MCP servers) at the project level.",
        code: {
          language: "text",
          content: `# User-level settings (applies to all projects):
~/.claude/settings.json

# Project-level settings (applies to this project only):
.claude/settings.json

# Order of precedence (highest wins):
1. Project settings (.claude/settings.json)
2. User settings (~/.claude/settings.json)
3. Default Claude Code behavior

# The .claude/ directory also contains:
.claude/
├── settings.json      ← project settings
├── skills/            ← project-specific skills
├── worktrees/         ← temporary worktree checkouts
└── memory/            ← (handled by user-level memory system)`,
        },
      },
      {
        heading: "Key Settings",
        body: "The most important settings are: permissions (allow/deny tool patterns), mcpServers (external tool connections), hooks (lifecycle automation), and model (default Claude model to use).",
        code: {
          language: "json",
          content: `// Complete settings.json example
{
  // Default model for this project
  "model": "claude-sonnet-4-6",

  // Permission rules
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git diff)",
      "Write(src/**)",
      "Read"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)"
    ]
  },

  // MCP servers
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}" }
    }
  },

  // Hooks
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{
          "type": "command",
          "command": "npx prettier --write $(echo $CLAUDE_TOOL_INPUT | jq -r '.file_path // empty') 2>/dev/null; true"
        }]
      }
    ]
  }
}`,
        },
      },
      {
        heading: "Environment Variables",
        body: "Some Claude Code behavior is also configurable via environment variables, useful for CI/CD environments where you can't easily write settings files.",
        code: {
          language: "bash",
          content: `# Core environment variables:
ANTHROPIC_API_KEY=sk-ant-...        # Required: your API key
CLAUDE_MODEL=claude-opus-4-6        # Override default model
CLAUDE_MAX_TOKENS=8192              # Override max response tokens
ANTHROPIC_BASE_URL=https://...      # Custom API endpoint (proxies)

# Non-interactive / CI usage:
export ANTHROPIC_API_KEY="$SECRET_KEY"
claude -p "Review this code for security issues" < code.ts`,
        },
      },
      {
        heading: "Tips",
        body: "Commit .claude/settings.json to your repository so the whole team shares project-level configuration. Keep sensitive values (API keys) in environment variables, not in settings files. Use the allow/deny permission system to create a safety net that matches your team's risk tolerance.",
      },
    ],
  },
];
