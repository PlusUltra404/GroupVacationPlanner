

import app
import models


# if needed, generate database schema
session = models.Session()


@app.cli.command("recreate_db")
def recreate_db():
    models.Base.metadata.drop_all(models.engine)
    models.Base.metadata.create_all(models.engine)

@app.cli.command("create_db")
def create_db():
    models.Base.metadata.create_all(models.engine)

@app.cli.command("seed_db")
def seed_db():
    session.add(models.User(email="asearle@g.clemson.edu",first_name="Adrian",last_name="Searles",username="asearle",password="Pspgame12"))
    session.commit()


if __name__ == "__main__":
    app.cli()