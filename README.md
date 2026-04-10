# ABC_Agentic_Training_VNR_-Jahnavi-
Agentic AI training repository containing weekly projects and assignments completed during the program. During the training, I learned and implemented concepts related to LLMs, Docker, n8n, and Git. Each folder represents the hands-on work and practical implementations completed in that specific week.
# AI Document Analyzer using n8n

An automated AI-powered workflow that processes documents from Google Drive, generates summaries using AI, stores results, and sends notifications — all without manual effort.


##  1. Business Problem

Organizations and individuals deal with a large number of documents daily such as reports, resumes, and research files.

### Challenges:
-  Manual document reading is time-consuming  
-  Difficult to summarize large documents quickly  
-  Inefficient handling of bulk files  
-  No centralized tracking system  
-  No real-time notification system  

---

##  2. Possible Solution

A system that can:
- Automatically detect new files  
- Extract and process content  
- Use AI to generate summaries  
- Store results in a structured format  
- Notify users instantly  

---

##  3. Implemented Solution

We built an **AI-powered automation workflow using n8n** that:

1.  Monitors a Google Drive folder  
2.  Downloads newly uploaded files  
3.  Extracts text from documents  
4.  Uses AI (TinyLlama via Ollama) to summarize content  
5.  Stores file name & summary in Google Sheets  
6.  Sends email notifications  

---

## 4. Tech Stack Used

- **n8n** – Workflow Automation  
- **Google Drive API** – File storage & trigger  
- **Google Sheets API** – Data storage  
- **Gmail API** – Notifications  
- **Ollama (TinyLlama Model)** – AI summarization  
- **LangChain** – AI prompt handling  

---

##  5. Architecture Diagram

Google Drive Trigger
↓
Download File
↓
Extract Text
↓
AI Summarization (Ollama + LangChain)
↓
Google Sheets (Store Data)
↓
Gmail (Send Notification)

<img width="1163" height="217" alt="image" src="https://github.com/user-attachments/assets/96c961d5-e1b1-42be-ac93-f1483dd2c94a" />

 6. How to Run Locally

### Step 1: Install n8n

1.npm install -g n8n
2.n8n start
3.Setup Credentials
   Connect Google Drive account
   Connect Google Sheets
   Connect Gmail
   
4.Setup Ollama locally
   Import Workflow
   Open n8n UI
   Import JSON workflow file
   Activate workflow
   
5.References & Resources
https://n8n.io/docs
https://ollama.ai
https://js.langchain.com/docs
https://developers.google.com/drive
https://developers.google.com/sheets/api
https://developers.google.com/gmail/api

6. Problems Faced & Solutions
Problem 1: Google API Authentication Issues
Solution: Properly configured OAuth credentials and permissions

Problem 2: File Format Handling
Solution: Used extract node to standardize text extraction

Problem 3: AI Model Setup (Ollama)
Solution: Installed and configured TinyLlama locally

Problem 4: Workflow Debugging
Solution: Used n8n execution logs to trace error

7. Key Features
    Fully automated workflow
    AI-powered summarization
    Real-time processing
    Instant notifications
8.Future Enhancements
   Add UI dashboard
   Support more file formats (PDF, DOCX)
   Use advanced AI models (GPT)
   Add tagging & search
   
9.Conclusion
This project demonstrates how AI and automation can simplify document processing. It reduces manual effort, improves efficiency, and enables scalable real-time document analysis.
