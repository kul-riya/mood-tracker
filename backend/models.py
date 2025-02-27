from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from config import db

class Mood(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    timestamp: Mapped[datetime] = mapped_column(default=datetime.now)
    mood: Mapped[str] = mapped_column()
    notes: Mapped[str] = mapped_column(default="")

    def to_dict(self):
        return {"id": self.id, "mood": self.mood, "timestamp": self.timestamp.isoformat(), "notes": self.notes}
