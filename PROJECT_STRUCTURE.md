# 📁 Project Structure

This document outlines the organization of the Flippy Flip Discord bot project.

## 🏗️ Root Directory Structure

```
📁 Flippy Flip/
├── 📁 .github/           # GitHub workflows and templates
├── 📁 .vscode/           # VS Code configuration
├── 📁 assets/            # Static assets and media files
│   ├── 📁 demo-images/   # Demo screenshots
│   ├── 📁 generated/     # Generated test images
│   └── 📁 test-images/   # Test assets
├── 📁 demos/             # Demo scripts and examples
├── 📁 deployment/        # Deployment scripts and configs
├── 📁 docs/              # Documentation
│   ├── 📁 api/          # API documentation
│   ├── 📁 features/     # Feature documentation
│   ├── 📁 guides/       # User and developer guides
│   └── 📁 reports/      # Status reports and audits
├── 📁 scripts/          # Utility scripts
├── 📁 src/              # Source code
│   ├── 📁 commands/     # Bot commands
│   ├── 📁 database/     # Database models and utils
│   ├── 📁 events/       # Discord event handlers
│   ├── 📁 handlers/     # Command and event handlers
│   ├── 📁 logs/         # Log files
│   ├── 📁 utils/        # Utility functions
│   ├── 📁 web/          # Web dashboard
│   ├── bot.js           # Main bot entry point
│   └── config.js        # Configuration
└── 📁 tests/            # Test suites
    ├── 📁 features/     # Feature tests
    ├── 📁 integration/  # Integration tests
    ├── 📁 items/        # Item system tests
    ├── 📁 system/       # System tests
    └── 📁 unit/         # Unit tests
```

## 📝 Configuration Files

- `.env` - Environment variables (not tracked)
- `.env.example` - Environment template
- `.gitignore` - Git ignore rules
- `.prettierrc` - Code formatting rules
- `package.json` - NPM configuration and dependencies
- `LICENSE` - MIT license
- `README.md` - Main project documentation

## 🎯 Key Directories

### `/src/commands/`
Organized by access level and category:
- `admin/` - Administrator commands
- `premium/` - Premium user commands  
- `public/` - Public commands
  - `economy/` - Economic features
  - `games/` - Gaming commands
  - `utility/` - Utility commands

### `/docs/`
Comprehensive documentation:
- `api/` - API and technical docs
- `features/` - Feature specifications
- `guides/` - Step-by-step guides
- `reports/` - Status and audit reports

### `/tests/`
Organized testing structure:
- `features/` - Feature-specific tests
- `integration/` - Integration tests
- `system/` - System-wide tests
- `unit/` - Unit tests

## 🧹 Maintenance

### Automated Cleanup
The `.gitignore` file automatically excludes:
- Generated test files (`test-*.png`, `test-*.js`)
- Temporary directories (`tmp/`, `temp/`)
- Report files in root (moved to `docs/reports/`)
- IDE and OS specific files

### Script Organization
NPM scripts are organized by category:
- **Development:** `start`, `dev`, `dashboard:dev`
- **Setup:** `setup`, `setup-check`
- **Testing:** `test*` commands
- **Database:** `db:*` commands
- **Formatting:** `format*` commands
- **Deployment:** `deploy`, `backup`, `migrate`

## 📊 Best Practices

1. **Keep root clean** - Move status files to `docs/reports/`
2. **Organize by purpose** - Group related files together
3. **Use consistent naming** - Follow established patterns
4. **Document changes** - Update this file when structure changes
5. **Test organization** - Maintain parallel structure in `/tests/`

## 🔄 Recent Cleanup (July 2025)

- Removed duplicate `/generated/` directory
- Moved status reports to `/docs/reports/`
- Cleaned up temporary test files
- Organized NPM scripts by category
- Enhanced `.gitignore` for better maintenance
- Created this structure documentation
