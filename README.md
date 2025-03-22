# AI Nurse Triage System
## Description
 - POC of a AI Nurse Triage System usign LLM models and Retrieval-augmented generation



### Project Structure:
```
ai-triage-system/
├── docker-compose.yml
├── traefik/
│   ├── traefik.yml
│   └── dynamic_conf.yml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── config/
│   │       └── prompt.js
│   └── .dockerignore
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── .dockerignore
└── README.md
```