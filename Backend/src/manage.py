

import app
import models
from sqlalchemy import DateTime

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
    #Users
    session.add(models.User(username="fireguy172",
        password="Pspgame#12",
        email="asearle@g.clemson.edu",
        mobile=" ",
        firstname="Adrian",
        lastname="Searles",
        intro=" ",
        profile=" ",
    ))
   
    session.add(models.User(username="asearle",
        password="testuser",
        email="fireguy172@gmail.com",
        mobile=" ",
        firstname="Micheal",
        lastname="White",
        intro=" ",
        profile=" ",
    ))
   
    session.add(models.User(username="shinebright",
        password="layover",
        email="asearlee@clemson.edu",
        mobile=" ",
        firstname="Kiersten",
        lastname="Searles",
        intro=" ",
        profile=" ",
    ))
    
    session.add(models.User(username="WineMaker",
        password="BillSucks",
        email="plant@gmail.com",
        mobile=" ",
        firstname="B",
        lastname="Ineos",
        intro=" ",
        profile="Hard working plant manager ",
    ))
    #Groups
    session.add(models.Group(created_by="asearle",
        title="Japan Getaway",
        membercount = 4,
        profile="Track team vacation ",
    ))
    session.add(models.Group(created_by="shinebright",
        title="Anash Bash",
        membercount= 2,
        profile="Bachelorette party ",
    ))
    session.add(models.Group_Member(
        group_id=2,
        user_id=3
        
    ))
    session.add(models.Group_Member(
        group_id=1,
        user_id=4
        
    ))
    session.add(models.Group_Member(
        group_id=1,
        user_id=3
       
    ))
    session.add(models.Group_Member(
        group_id=1,
        user_id=2
      
    ))
    session.add(models.Group_Member(
        group_id=1,
        user_id=1
       
    ))
    session.add(models.Group_Member(
        group_id=2,
        user_id=4
        
    ))
    session.add(models.Event(
        user_id=3,
        group_id=2,
        title = "Flight",
        date = "2022-04-10",
        content = "Flight is at 9AM"
        
    ))
    session.add(models.Event(
        user_id=1,
        group_id=1,
        title = "Food Tour",
        date = "2022-05-15",
        content = "Go on food tour in japan"
        
    ))
    session.commit()


if __name__ == "__main__":
    app.cli()
