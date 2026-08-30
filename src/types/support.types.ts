export interface EmailMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  body: string;
  time: string;
  date: string;
  isStarred: boolean;
  isRead: boolean;
  category: string;
}
