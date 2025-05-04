import sqlite3
import json

"""
Goal types:
- 0: Reduce number of transactions per month
- 1: Reduce max transaction amount
- 2: Reduce total amount spent
"""


conn = sqlite3.connect("database.db")
cursor = conn.cursor()
cursor.execute(
    """
DROP TABLE IF EXISTS goals
"""
)

cursor.execute(
    """
CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    goal_type INTEGER NOT NULL,
    goal INTEGER NOT NULL,
    goal_text TEXT NOT NULL,
    affected_site TEXT NOT NULL, -- JSON-encoded list
    AI BOOLEAN NOT NULL
)
"""
)

# Commerce
cursor.execute(
    """
CREATE TABLE IF NOT EXISTS commerce (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commerce TEXT NOT NULL,
    necessity REAL NOT NULL,
    frequency INTEGER NOT NULL,
    category TEXT NOT NULL,
    avg_amount REAL NOT NULL,
    total_amount REAL NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL
)
"""
)

# Categories
cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        necessity REAL NOT NULL,
        frequency INTEGER NOT NULL,
        avg_amount REAL NOT NULL,
        total_amount REAL NOT NULL,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL
    )
"""
)


conn.commit()
# cursor.execute("SELECT * FROM goals")
# rows = cursor.fetchall()
# for row in rows:
#     print(row)

conn.close()


def insert_goal(goal_type, goal, goal_text, affected_site, AI):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute(
        """
    INSERT INTO goals (goal_type, goal, goal_text, affected_site, AI)
    VALUES (?, ?, ?, ?, ?)
    """,
        (goal_type, goal, goal_text, json.dumps(affected_site), AI),
    )
    conn.commit()
    conn.close()


# Example
# insert_goal(
#     goal_type=0,
#     goal=20,
#     goal_text="Reduce Uber Rides to 20 per month",
#     affected_site=["Uber"],
#     AI=False
# )


def add_commerce_to_db(data, month, year):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    for row in data:
        cursor.execute(
            """
        INSERT INTO commerce (commerce, necessity, frequency, category, avg_amount, total_amount,month, year)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
            (
                row["commerce"],
                row["necessity"],
                row["frequency"],
                row["category"],
                row["avg_amount"],
                row["total_amount"],
                month,
                year,
            ),
        )
    conn.commit()
    conn.close()


def add_categories_to_db(data, month, year):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    for row in data:
        cursor.execute(
            """
        INSERT INTO categories (category, necessity, frequency, avg_amount, total_amount, month, year)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
            (
                row["category"],
                row["necessity"],
                row["frequency"],
                row["avg_amount"],
                row["total_amount"],
                month,
                year,
            ),
        )
    conn.commit()
    conn.close()
