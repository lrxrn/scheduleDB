# 📅 ScheduleDB

<div align="center">
  
  ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/lrxrn/scheduleDB/weekly-fetch.yml?style=for-the-badge&logo=github-actions&logoColor=white&label=Weekly%20Update)
  ![Last Updated](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/lrxrn/scheduleDB/main/output.json&query=$.lastUpdated&label=Last%20Updated&style=for-the-badge&color=blue)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  
</div>

## 🚀 Overview

ScheduleDB is an automated timetable data repository that fetches, processes, and maintains structured schedule information. The system automatically updates every Monday at 12:00 AM (GMT+8) through GitHub Actions workflows.

## ⏱️ How It Works

1. **Weekly Data Fetch**: Automatically retrieves the latest timetable data from a remote API
2. **Data Processing**: Maps and structures the data by intake and grouping
3. **Archiving**: Stores timestamped snapshots in the `/archive/files` directory
4. **Version Control**: Commits and pushes changes to maintain a historical record

## 🔧 Tools and Scripts

| Script | Purpose |
|--------|---------|
| `weeklyFetch.js` | Main script for fetching and processing weekly data |

## 📁 Project Structure

```
scheduleDB/
├── output.json         # Latest timetable data
├── package.json        # Project dependencies
├── README.md           # Project documentation
├── weeklyFetch.js      # Main data processing script
└── archive/            # Storage for unused files and historical data
    ├── fetchData.js    # Legacy on-demand data fetching utility
    ├── formatJson.js   # Legacy JSON formatting utility
    ├── mergeJson.js    # Legacy JSON merging utility
    ├── out.json        # Previous output file
    └── files/          # Historical timetable snapshots
        └── output_*.json
```

## 📊 Data Format

```json
{
  "INTAKE_GROUPING": [
    {
      "INTAKE": "string",
      "GROUPING": "string",
      "MODULE": "string",
      "DAY": "string",
      "TIME": "string",
      "LOCATION": "string",
      "LECTURER": "string",
      // Additional fields...
    }
  ]
}
```

## 🔄 Integration

This repository serves as the data source for the `apu-schedule` application. The structured data powers various features including:

- 📲 Personalized timetable views
- 🔔 Upcoming class notifications
- 📆 Calendar integration
- 📝 Schedule planning tools

## 🛠️ Manual Trigger

To manually trigger a data update:

1. Go to the Actions tab in the repository
2. Select "Weekly Timetable Update" workflow
3. Click "Run workflow"

## 📦 Installation

```bash
git clone https://github.com/yourusername/scheduleDB.git
cd scheduleDB
npm install
```

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <sub>Built with ❤️ for better schedule management</sub>
</div>
