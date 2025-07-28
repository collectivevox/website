from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict, Any
import uuid
from datetime import datetime

# Import email functions
import resend
from typing import Dict, Any

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Initialize Resend
resend.api_key = os.getenv("RESEND_API_KEY")

def send_assessment_notification(form_data: Dict[str, Any]) -> bool:
    """Send email notification for assessment form submission"""
    try:
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #ff6b35; border-bottom: 2px solid #ff6b35; padding-bottom: 10px;">
                        🎯 New Free Assessment Request - Collective Vox
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
                        <p><strong>Name:</strong> {form_data.get('name', 'Not provided')}</p>
                        <p><strong>Email:</strong> {form_data.get('email', 'Not provided')}</p>
                    </div>
                    
                    <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #333;">Professional Details</h3>
                        <p><strong>Industry:</strong> {form_data.get('industry', 'Not provided')}</p>
                        <p><strong>Job Title:</strong> {form_data.get('jobTitle', 'Not provided')}</p>
                    </div>
                    
                    <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #333;">Key Challenges</h3>
                        <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #ff6b35;">
                            {form_data.get('keyChallenges', 'Not provided')}
                        </p>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                        <p style="margin: 0; font-size: 14px; color: #666;">
                            This assessment request was submitted through collectivevox.app
                        </p>
                        <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">
                            Submitted at: {form_data.get('submitted_at', 'Unknown')}
                        </p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        params = {
            "from": "Collective Vox <onboarding@resend.dev>",
            "to": ["collectivevox@gmail.com"],
            "subject": f"🎯 New Assessment Request from {form_data.get('name', 'Unknown')} - Collective Vox",
            "html": html_content,
        }
        
        email = resend.Emails.send(params)
        print(f"Assessment notification sent successfully: {email}")
        return True
        
    except Exception as e:
        print(f"Error sending assessment notification: {str(e)}")
        return False

def send_contact_notification(form_data: Dict[str, Any]) -> bool:
    """Send email notification for contact form submission"""
    try:
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #ff6b35; border-bottom: 2px solid #ff6b35; padding-bottom: 10px;">
                        💬 New Contact Inquiry - Collective Vox
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
                        <p><strong>Name:</strong> {form_data.get('name', 'Not provided')}</p>
                        <p><strong>Email:</strong> {form_data.get('email', 'Not provided')}</p>
                    </div>
                    
                    <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #333;">Message</h3>
                        <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #ff6b35; white-space: pre-wrap;">
                            {form_data.get('message', 'No message provided')}
                        </p>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                        <p style="margin: 0; font-size: 14px; color: #666;">
                            This contact inquiry was submitted through collectivevox.app
                        </p>
                        <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">
                            Submitted at: {form_data.get('submitted_at', 'Unknown')}
                        </p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        params = {
            "from": "Collective Vox <onboarding@resend.dev>",
            "to": ["collectivevox@gmail.com"],
            "subject": f"💬 New Contact from {form_data.get('name', 'Unknown')} - Collective Vox",
            "html": html_content,
        }
        
        email = resend.Emails.send(params)
        print(f"Contact notification sent successfully: {email}")
        return True
        
    except Exception as e:
        print(f"Error sending contact notification: {str(e)}")
        return False

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class EmailNotificationRequest(BaseModel):
    form_data: Dict[str, Any]
    form_type: str  # "assessment" or "contact"
    recipient_email: str

class EmailResponse(BaseModel):
    success: bool
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/send-form-notification", response_model=EmailResponse)
async def send_form_notification(
    request: EmailNotificationRequest, 
    background_tasks: BackgroundTasks
):
    """
    Send email notification for form submissions
    """
    try:
        # Add timestamp to form data
        form_data_with_timestamp = {
            **request.form_data,
            "submitted_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        }
        
        # Send appropriate email based on form type
        if request.form_type == "assessment":
            background_tasks.add_task(
                send_assessment_notification,
                form_data_with_timestamp
            )
        elif request.form_type == "contact":
            background_tasks.add_task(
                send_contact_notification,
                form_data_with_timestamp
            )
        else:
            raise HTTPException(status_code=400, detail="Invalid form type")
        
        return EmailResponse(
            success=True,
            message=f"Email notification queued successfully for {request.form_type} form"
        )
        
    except Exception as e:
        logger.error(f"Error sending form notification: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send notification: {str(e)}")

@api_router.post("/test-email")
async def test_email(background_tasks: BackgroundTasks):
    """
    Test endpoint to verify email functionality
    """
    try:
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "This is a test message to verify email functionality.",
            "submitted_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        }
        
        # Replace with your actual Gmail address
        recipient_email = "collectivevox@gmail.com"
        
        background_tasks.add_task(
            send_contact_notification,
            test_data,
            recipient_email
        )
        
        return {"message": "Test email queued successfully"}
        
    except Exception as e:
        logger.error(f"Error sending test email: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send test email: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
