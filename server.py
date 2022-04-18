from unittest import result
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


user_id = -1
last_question_id = 6
correct_ans = 0
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
            "text": "You too",
            "video": "https://www.signingsavvy.com/media/mp4-ld/8/8896.mp4"},
        "video_3": {
            "text": "Good Night",
            "video": "https://www.signingsavvy.com/media/mp4-ld/7/7038.mp4"},
        "next_lesson":"end",
    }
]

#quiz question types: translation or conversation
questions = [
    {
        "question_id": "1",
        "question_type": "translation",
        "instructions": "Type the signed phrase in English in the box below",
        "video_1": {
            "text": "How are you?",
            "video": "https://www.signingsavvy.com/media/mp4-ld/22/22100.mp4"},
        "video_2": "null",
        "video_3": "null",
        "video_4": "null"
    },
    {
        "question_id": "2",
        "question_type": "translation",
        "instructions": "Type the signed phrase in English in the box below",
        "video_1": {
            "text": "Goodnight",
            "video": "https://www.signingsavvy.com/media/mp4-ld/7/7038.mp4"},
        "video_2": "null",
        "video_3": "null",
        "video_4": "null"
    },
    {
        "question_id": "3",
        "question_type": "conversation",
        "instructions": "Which of the following would be an appropriate response to this sign?",
        "video_1": {
            "text": "How are you?",
            "video": "https://www.signingsavvy.com/media/mp4-ld/22/22100.mp4"},
        "video_2": {
            "text": "Bad",
            "video": "https://www.signingsavvy.com/media/mp4-ld/21/21535.mp4"},
        "video_3": {
             "text": "Good morning",
             "video": "https://www.signingsavvy.com/media/mp4-ld/9/9148.mp4"},
        "video_4": {
             "text": "You too",
             "video": "https://www.signingsavvy.com/media/mp4-ld/8/8896.mp4"},
        "answer": "video_2"
    },
    {
        "question_id": "4",
        "question_type": "conversation",
        "instructions": "Which of the following would be an appropriate response to this sign?",
        "video_1": {
            "text": "Good night",
            "video": "https://www.signingsavvy.com/media/mp4-ld/7/7038.mp4"},
        "video_2": {
            "text": "Good morning",
            "video": "https://www.signingsavvy.com/media/mp4-ld/9/9148.mp4"},
        "video_3": {
             "text": "Bad",
             "video": "https://www.signingsavvy.com/media/mp4-ld/21/21535.mp4"},
        "video_4": {
             "text": "See you later",
             "video": "https://www.signingsavvy.com/media/mp4-ld/22/22743.mp4"},
        "answer": "video_4"
    },
    {
        "question_id": "5",
        "question_type": "conversation",
        "instructions": "Which of the following would be an appropriate response to this sign?",
        "video_1": {
            "text": "Hello",
            "video": "https://www.signingsavvy.com/media/mp4-ld/24/24851.mp4"},
        "video_2": {
            "text": "Bad",
            "video": "https://www.signingsavvy.com/media/mp4-ld/21/21535.mp4"},
        "video_3": {
             "text": "Nice to meet you!",
             "video": "https://www.signingsavvy.com/media/mp4-ld/29/29516.mp4"},
        "video_4": {
             "text": "You too",
             "video": "https://www.signingsavvy.com/media/mp4-ld/8/8896.mp4"},
        "answer": "video_3"
    },
    {
        "question_id": "6",
        "question_type": "conversation",
        "instructions": "Which of the following would be an appropriate response to this sign?",
        "video_1": {
            "text": "How are you?",
            "video": "https://www.signingsavvy.com/media/mp4-ld/22/22100.mp4"},
        "video_2": {
            "text": "Nice to meet you",
            "video": "https://www.signingsavvy.com/media/mp4-ld/29/29516.mp4"},
        "video_3": {
             "text": "Good",
             "video": "https://www.signingsavvy.com/media/mp4-ld/21/21534.mp4"},
        "video_4": {
             "text": "You too",
             "video": "https://www.signingsavvy.com/media/mp4-ld/8/8896.mp4"},
        "answer": "video_3"
    },
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
    lesson = lessons[0]
    for l in lessons:
        if (int(l["lesson_id"]) == int(lesson_id)):
            lesson = l
    return render_template('practice.html', lesson=lesson, lesson_id = lesson_id)

@app.route('/quiz/<question_id>')
def quiz(questions=questions, question_id = None):
    global correct_ans
    print("now on question: " + str(question_id))
    if int(question_id)-1 >= last_question_id:
        percentage = correct_ans/last_question_id * 100
        score = str(percentage) + "%"
        correct_ans = 0
        print(score)
        return render_template('quiz_final.html', question=score, question_id=score)
    else:
        question = questions[int(question_id)-1]
        if (question["question_type"] == "translation"):
            return render_template('quiz_translation.html', question=question, question_id=question_id)
        else: #question type is conversation
            return render_template('quiz_conversation.html', question=question, question_id=question_id)



# AJAX FUNCTIONS
# ajax for checking quiz responses
@app.route('/check_answer', methods=['GET', 'POST'])
def check_answer():
    print("here")

    entry = request.get_json()

    print("here")
    question_id = entry['question_id']
    answer = entry['answer']
    question = questions[int(question_id)-1]
    if question["question_type"] == "translation":
        if question["video_1"]["text"] == answer:
            # correct
            correct_ans += 1
    else:
        if question["answer"] == answer:
            correct_ans += 1
    
    return jsonify(correct_ans = correct_ans)

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
    correct_ans = 0
    app.run(debug = True)




