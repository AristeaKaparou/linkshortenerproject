---
name: security-audit
description: Describe when to use this prompt
agent: ask
---
Perform a securuty audit of this codebase to detect any potential security vulnerabilities in this project.
Output your findings as a markdown formatted table with the following columns (ID should start add one and auto-increment, File Paath shoild be an actual link to the file): "ID", "Severity", "Issue", "File Path", "Line Number(s)", and "recommendation". 

Next. ask the user which issues they want to fix by either replying "all" or comma separated list IDs. After their reply, run a separate sub agent (#runSubagent) to fix each issue that the user has specified. Each sub agent should report back with a simple 'subAgentSucess: true | false'.