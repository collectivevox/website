import resend
import os
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

# Initialize Resend with API key
resend.api_key = os.getenv("RESEND_API_KEY")

def send_assessment_notification(form_data: Dict[str, Any], recipient_email: str) -> bool:
    """
    Send email notification for assessment form submission
    """
    try:
        # Create HTML email content
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
                        <p><strong>Phone:</strong> {form_data.get('phone', 'Not provided')}</p>
                    </div>
                    
                    <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #333;">Professional Details</h3>
                        <p><strong>Industry:</strong> {form_data.get('industry', 'Not provided')}</p>
                        <p><strong>Job Title:</strong> {form_data.get('jobTitle', 'Not provided')}</p>
                        <p><strong>Experience Level:</strong> {form_data.get('experienceLevel', 'Not provided')}</p>
                    </div>
                    
                    <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #333;">Key Challenges</h3>
                        <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #ff6b35;">
                            {form_data.get('keyChallenges', 'Not provided')}
                        </p>
                    </div>
                    
                    <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #333;">Goals & Interests</h3>
                        <p><strong>Primary Goals:</strong> {form_data.get('primaryGoals', 'Not provided')}</p>
                        <p><strong>Interested In:</strong> {form_data.get('interestedIn', 'Not provided')}</p>
                        <p><strong>Preferred Meeting Times:</strong> {form_data.get('preferredTimes', 'Not provided')}</p>
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
        
        # Send email using Resend (using default domain until collectivevox.app is verified)
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

def send_contact_notification(form_data: Dict[str, Any], recipient_email: str) -> bool:
    """
    Send email notification for contact form submission
    """
    try:
        # Create HTML email content
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
        
        # Send email using Resend
        params = {
            "from": "Collective Vox <noreply@collectivevox.app>",
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