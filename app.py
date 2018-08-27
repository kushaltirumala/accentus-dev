import getname as getname
from flask import Flask, render_template, redirect, url_for, request, session
from flask_sqlalchemy import SQLAlchemy
import config
from sqlalchemy.ext.declarative import declarative_base


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = config.db["url"]
app.config['SESSION_TYPE'] = "sqlalchemy"
app.secret_key = config.session['secret-key']
db = SQLAlchemy(app)



class Users(db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))

    def __init__(self, username, password):
        self.username = username
        self.password = password



@app.route("/")
def index():
    if not session.get('logged_in'):
        return render_template('index.html')
    else:
        if request.method == 'POST':
            return render_template('index.html')
        return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        name = request.form['username']
        passw = request.form['password']
        data = Users.query.filter_by(username=name, password=passw).first()
        if data is not None:
            session['logged_in'] = True
            session['username'] = name
            return redirect(url_for('home'))
        else:
            return 'Username or password incorrect!'

@app.route("/home", methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        if session['logged_in']:
            return render_template("home.html")
        else:
            return redirect(url_for(login))

@app.route('/register/', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        new_user = Users(username=request.form['username'], password=request.form['password'])
        db.session.add(new_user)
        db.session.commit()
        return render_template('login.html')
    return render_template('register.html')


@app.route("/logout")
def logout():
    """Logout Form"""
    session['logged_in'] = False
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.debug = True
    app.run()
