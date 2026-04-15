from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# ... (previous imports)
from .routes import term_routes, search_routes
from .database.db import engine, Base
from .config import settings

# Initialize database
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(term_routes.router)
app.include_router(search_routes.router)

# Serve static files
FRONTEND_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "frontend")
app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

@app.get("/")
async def root():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))

@app.get("/css/style.css")
async def style():
    return FileResponse(os.path.join(FRONTEND_DIR, "css", "style.css"))
