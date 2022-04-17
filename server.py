from unittest import result
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


user_id = -1
user_data = {}

lessons = [
    {
        "lesson_id": "1",
        "title": "Introductions",
        "video_1": {
            "text": "Hello",
            "video": "https://www.signingsavvy.com/media/mp4-ld/24/24851.mp4"},
        "video_2": {
            "text": "Nice to Meet You",
            "video": "https://www.signingsavvy.com/media/mp4-ld/29/29516.mp4"},
        "video_3": {
            "text": "Good Morning",
            "video": "https://www.signingsavvy.com/media/mp4-ld/9/9148.mp4"},
        "next_lesson":"2"
    },
    {
        "lesson_id": "2",
        "title": "Conversation",
        "video_1": {
            "text": "How Are You?",
            "video": "https://www.signingsavvy.com/media/mp4-ld/22/22100.mp4"},
        "video_2": {
            "text": "Good",
            "video": "https://www.signingsavvy.com/media/mp4-ld/21/21534.mp4"},
        "video_3": {
            "text": "Bad",
            "video": "https://www.signingsavvy.com/media/mp4-ld/21/21535.mp4"},
        "next_lesson":"3"
    },
    {
        "lesson_id": "3",
        "title": "Goodbyes",
        "video_1": {
            "text": "See You Later!",
            "video": "https://www.signingsavvy.com/media/mp4-ld/22/22743.mp4"},
        "video_2": {
            "text": "Me Too!",
            "video": "https://www.signingsavvy.com/media/mp4-ld/8/8896.mp4"},
        "video_3": {
            "text": "Good Night",
            "video": "https://www.signingsavvy.com/media/mp4-ld/7/7038.mp4"},
        "next_lesson":"end",
    }
]

# ROUTES


@app.route('/')
def home():
   return render_template('home.html')   


@app.route('/learn/<lesson_id>')
def learn(lessons=lessons, lesson_id = None):
    lesson = lessons[0]
    for l in lessons:
        if (int(l["lesson_id"]) == int(lesson_id)):
            lesson = l
    return render_template('learn.html', lesson=lesson, lesson_id = lesson_id) 

@app.route('/practice/<lesson_id>')
def practice(lessons=lessons, lesson_id = None):
    return render_template('practice.html', lessons=lessons, lesson_id = lesson_id) 



# AJAX FUNCTIONS

# ajax for adding a new user
@app.route('/add_user', methods=['GET', 'POST'])
def add_user():
    global user_data 
    global user_id 

    user_id += 1
    # the data sent should be a dictionary with 'time' as  a field.
    json_data = request.get_json()   
    time = json_data["time"] 
    id = user_id
    
    # create a new entry to dictionary with time and id.
    # practice_results and quiz_results firled to be filled later.
    new_user_entry = {
        "user_id" : id,
        "practice_start_time": time,
        "practice_results": [None,None,None],
        "quiz_results": []
    }
    # add the new entry to the dictionary
    user_data[str(user_id)] = new_user_entry

    #send back the new entry
    return jsonify(user_data[str(user_id)])


# ajax for recording a practice question result
@app.route('/add_practice_result', methods=['GET', 'POST'])
def add_practice_result():
    global user_data 
    global user_id 

    # the data sent should be a dictionary with 'practice number' and 'result' as fields.
    json_data = request.get_json()
    practice_number = json_data["practice_number"]   
    result = json_data["result"] 
    id = user_id
    
    # assign the new True/False value to the proper index (practice question #) in the
    # array of results in the dictionary
    user_data[str(user_id)]["practice_results"][int(practice_number)] = result

    #send back the new entry
    return jsonify(user_data[str(user_id)])



 


if __name__ == '__main__':
   app.run(debug = True)




