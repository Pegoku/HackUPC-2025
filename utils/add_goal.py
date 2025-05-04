from fastapi import HTTPException
from utils.db import insert_goal


async def add_goal(goal_type, goal, goal_text, affected_site, AI):
    try:
        # Validar que goal sea un número

        # Insert into db
        insert_goal(int(goal_type), goal, goal_text, affected_site, AI)

        return {"message": "Goal created successfully"}
    except HTTPException as e:
        raise e
    except Exception as e:
        # Usar repr para asegurar que el mensaje sea serializable
        raise HTTPException(status_code=500, detail=f"Internal server error: {repr(e)}")
