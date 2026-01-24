# Home Assistant Website - Structure & Plan

**Date:** 2026-01-24
**Goal:** Create professional, useful and inspiring page about Home Assistant setup

## Key Stats

- **40+ devices**
- **28 automations**
- **9 Grafana dashboards**
- **100% local** (no cloud dependencies)

## Recommended Page Structure

### 1. Main Page (/)
**Purpose:** First impression, overview, motivation

**Sections:**
- Hero section with headline and main dashboard screenshot
- Stats overview (4 blocks: Devices, Automations, Dashboards, Local)
- Feature highlights (Smart Automations, Data & Monitoring, Security & Privacy)
- Tech stack overview
- Latest updates (blog-style)

### 2. Hardware & Setup (/hardware)
**Purpose:** For beginners - what's needed, how to start

**Content:**
- Raspberry Pi 5 setup (4GB RAM, 256GB SSD)
- Sonoff Zigbee 3.0 USB Dongle Plus
- Budget breakdown (~4,600 CZK)
- Step-by-step installation guide
- First configuration steps
- Advanced configuration (SSD boot, static IP, backups)

### 3. Devices (/devices)
**Purpose:** Overview of all 40+ devices, inspiration

**Categories:**
- Lighting
- Vacuum (Xiaomi X20 Pro - "Darth Sider")
- 3D Printer (Bambu Lab)
- Sensors
- Switches

**For each device:**
- Basic info (model, integration)
- Entity list
- Automations
- Screenshots
- Grafana dashboard (if exists)
- Troubleshooting
- Code snippets for download

### 4. Automations (/automations)
**Purpose:** Inspiration, guides, code snippets

**Categories:**
- Vacuum & Cleaning (3 automations)
- Lighting (8 automations)
- 3D Printing (4 automations)
- Notifications (5 automations)
- Presence (3 automations)
- Energy (3 automations)
- Media (2 automations)

**For each automation:**
- Purpose
- Triggers
- Conditions
- Actions
- Complete YAML
- Possible improvements
- Troubleshooting

### 5. Monitoring & Data (/monitoring)
**Purpose:** Grafana, InfluxDB, Node-RED, data visualization

**Grafana Dashboards (9):**
1. 🏠 Presence at home
2. ⚡ Energy consumption
3. 🖨️ 3D Printing
4. 🤖 Vacuum
5. 🌡️ Temperatures
6. 🔋 Device batteries
7. 💾 Raspberry Pi 5 (CPU, RAM, disk)
8. 📦 Filament boxes
9. 💻 PC monitoring

**Technical stack:**
```
Home Assistant (Data Collection)
         ↓
    InfluxDB (Time-Series DB)
         ↓
     Grafana (Visualization)

   Node-RED (Reports)
```

### 6. Advanced (/advanced)
**Purpose:** For advanced users

**Topics:**
- Custom components
- Template sensors (Jinja2)
- MQTT communication
- ZHA event handling
- Performance optimization
- Security

### 7. Guides (/guides)
**Purpose:** Step-by-step tutorials

**Categories:**
- For beginners (first light, first automation, notifications, dashboard)
- Integrations (Zigbee, Xiaomi vacuum, Bambu Lab, MQTT)
- Monitoring (InfluxDB, Grafana, Node-RED)
- Security (VPN, HTTPS, AdGuard DNS, backups)
- Optimization (SSD boot, memory reduction, debugging)

### 8. Troubleshooting (/troubleshooting)
**Purpose:** Solving common problems

**Topics:**
- Automation not triggering
- Person entity wrong state
- Template conditions with `for:`
- Zigbee device disconnecting
- Home Assistant slow/unresponsive
- Notifications not arriving

### 9. Resources (/resources)
**Purpose:** Links, downloads, community

**Downloads:**
- Config snippets (automations.yaml, templates.yaml, scripts.yaml)
- Grafana dashboards (all 9)
- Node-RED flows
- Monthly HTML report

**Links:**
- Official documentation
- Community forums
- Custom components used

## Design Features

### Must-have:
- Responsive design (mobile + desktop)
- Dark/Light mode toggle
- Code syntax highlighting
- Search box
- Breadcrumbs navigation
- "Back to top" button
- Copy button for code snippets
- Table of contents (TOC) on long pages

### Nice-to-have:
- Interactive Floor3D preview
- Live dashboard embed
- Animated stats
- Before/After slider
- Video demos
- 3D Zigbee mesh visualization
- Cost calculator
- Device compatibility checker

## Roadmap

### Phase 1: Foundation (month 1)
- Main page
- Hardware & Setup
- Basic devices (3-5 detailed pages)
- 5 beginner guides

### Phase 2: Content (months 2-3)
- All devices documented
- All automations explained
- Grafana dashboards for download
- Troubleshooting guide

### Phase 3: Advanced (month 4+)
- Video tutorials
- Interactive elements
- Community section
- Blog (new automations, tips)

## Key Principles

1. **Progressive disclosure** - From basics to advanced
2. **Practical first** - Theory after practice
3. **Show, don't tell** - Screenshots & code snippets
4. **Keep it updated** - Last update date everywhere
5. **Make it shareable** - Download buttons, embeds

## SEO Keywords

- Home Assistant návod česky
- Chytrá domácnost bez cloudu
- Raspberry Pi Home Assistant
- Xiaomi vysavač Home Assistant
- Bambu Lab integrace
- Grafana Home Assistant
- ZHA automatizace
