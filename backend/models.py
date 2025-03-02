from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from config import db

class Mood(db.Model):
    __table_name__="moods"
    id: Mapped[int] = mapped_column(primary_key=True)
    timestamp: Mapped[datetime] = mapped_column(default=datetime.now)
    mood: Mapped[str] = mapped_column()
    notes: Mapped[str] = mapped_column(default="")

    def to_dict(self):
        return {"id": self.id, "mood": self.mood, "timestamp": self.timestamp.isoformat(), "notes": self.notes,}

class Preference(db.Model):
    __table_name__="preferences"
    id: Mapped[int] = mapped_column(primary_key=True)
    mood: Mapped[str] = mapped_column()
    activity: Mapped[str] = mapped_column()

    def to_dict(self):
        return {
            "id":self.id,
            "mood":self.mood,
            "activity":self.activity,
        }