# ABC_Agentic_Training_VNR_-Jahnavi-
Agentic AI training repository containing weekly projects and assignments completed during the program. During the training, I learned and implemented concepts related to LLMs, Docker, n8n, and Git. Each folder represents the hands-on work and practical implementations completed in that specific week.

# Agentic RAG Assistant using n8n

An intelligent AI-powered assistant that can answer user queries, understand conversation context, and extract knowledge from uploaded documents (PDFs) using Retrieval-Augmented Generation (RAG). This system is fully automated using n8n workflows and integrates AI capabilities to provide accurate and context-aware responses.

## 1. Business Problem

Users often need to extract information from documents and ask questions related to them. However, manually reading large documents is time-consuming and inefficient. There is also a lack of systems that can combine conversational AI with document understanding while maintaining context across multiple queries. Additionally, users need a unified solution that supports chat, document-based Q&A, and intelligent search.

## 2. Possible Solution

A system that can accept user queries, understand conversation history, detect uploaded documents, extract and process document content, and intelligently route queries based on context. Such a system should generate accurate AI responses while supporting both general queries and document-based questions.

Live_Record_Link:https://drive.google.com/file/d/1nD8mykTrC1lsmOvNHdWFios4XZPC9apd/view?usp=sharing

## 3. Implemented Solution

We built an Agentic AI Assistant using n8n that receives user queries through a webhook (UI or Postman), processes the input, and identifies whether a document is uploaded. The workflow uses a Switch node to route the request into three modes: General Chat, Document Mode (RAG), and Search Mode. If a PDF is uploaded, the system extracts text from the document and uses the TinyLlama model via Ollama to generate answers strictly based on the document. For general queries, it responds using chat history to maintain context. The system finally returns a structured response back to the user.

## 4. Tech Stack Used

The project is built using n8n for workflow automation, Ollama with the TinyLlama model for local AI processing, LangChain for prompt handling, ngrok for exposing local webhooks, Postman or UI for testing, and JavaScript for data processing and routing logic.

## 5. Architecture Diagram
<img width="621" height="628" alt="image" src="https://github.com/user-attachments/assets/45dc002f-8284-472d-a267-5330f5f8c81d" />


<img width="1202" height="306" alt="image" src="https://github.com/user-attachments/assets/805519aa-6c77-42c6-b62a-75de8f85b117" />

## 6. How to Run Locally

Step 1: Install n8n
npm install -g n8n
n8n start
Step 2: Setup Ollama
ollama run tinyllama
Step 3: Setup ngrok
ngrok http 5678
Step 4: Import Workflow
Open n8n UI
Import workflow JSON
Activate workflow
Step 5: Test the API
Without File (General Chat)
message: What is Java?
With File (Document Mode)
message: What is UML?
file0: (upload PDF)
Search Mode
message: SEARCH UML

## 7. Problems Faced & Solutions

Problem 1: Chat history not working

Solution: Parsed history from request and formatted it properly

Problem 2: Invalid JSON errors

Solution: Fixed expressions in Edit Fields node (removed extra quotes)

Problem 3: Wrong routing (always general mode)

Solution: Corrected Switch logic and ensured binary file passing

Problem 4: File not detected in workflow

Solution: Passed $binary across nodes correctly

Problem 5: Model giving incorrect responses

Solution: Improved prompt engineering to restrict hallucination


## 8. Key Features

Multi-mode AI assistant (Chat + RAG + Search)
Context-aware responses using chat history
PDF-based question answering
Smart routing using Switch node
Fully automated workflow
Works locally (no API cost)

## 9. Future Enhancements

Add vector database (FAISS / Pinecone)
Use advanced models (Llama3 / GPT)
Build frontend UI (React)
Support multiple file uploads
Improve semantic search

## 10. Conclusion

This project demonstrates how Agentic AI + RAG + Automation can be combined to build an intelligent assistant that:

Understands context
Reads and analyzes documents
Provides accurate answers
Reduces manual effort

## 11. References & Resources
https://n8n.io/docs
https://ollama.ai
https://js.langchain.com/docs
https://developers.google.com/drive
https://developers.google.com/sheets/api
https://developers.google.com/gmail/api

## 12. OUTPUT:
Normal chat:
<img width="728" height="565" alt="image" src="https://github.com/user-attachments/assets/a4a3b6fd-3ea9-483f-b969-3160716fa6b6" />

File is Atteached:

<img width="721" height="564" alt="image" src="https://github.com/user-attachments/assets/37bb6105-5aa3-4dc6-90aa-29856c1d6fd8" />

Search:
<img width="725" height="573" alt="image" src="https://github.com/user-attachments/assets/8098d870-4fe6-420e-8df8-c5c7df8279cf" />



---
Full Stack project:
https://github.com/jahnavikollipara/Cloud_Kitchen.git


ML Project:
https://github.com/jahnavikollipara/ML_project.git
