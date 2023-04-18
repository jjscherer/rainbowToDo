import './ToDoList.css';

export default function ToDoList(props){
    let date = props.date;
    let months = props.months;
    return (
        <div className='todo-list'>
            <h1>
                {months[(date.getMonth()) % 12]} {date.getDate()} {date.getFullYear()}
            </h1>
            <div className="add-form">
                <form>
                    <label>
                        Task:
                        <input type="text" name="input" />
                    </label> 
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

/*<style>
    select {
        margin-left: 10px;
    }
    li {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }
    .circle {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: 10px;
        border-radius:50%
    }
    select + .circle::after:nth-of-type(1) {
        background: linear-gradient(to right, red 33.3%, transparent 33.3%);
    }
    select + .circle::after:nth-of-type(2) {
        background: linear-gradient(to right, red 66.6%, transparent 66.6%);
    }
    select + .circle::after:nth-of-type(3) {
        background: red;
    }

</style>
<body>
    <form>
        <label for="input"> Enter things to do:</label> 
        <input type="text" id="input" name="input">
        <button type="button" onclick="addToList()">Add Item</button>
    </form>
    
    <h3>Items List: </h3>
    <ol id="list"></ol>

    <script>
        var list = document.getElementById("list");
        var count = 1;
        function addToList() {
            var input = document.getElementById("input").value;
            if (input !== "") {
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(input));
                var select = document.createElement('select');
                select.name='myselect';
                var option1 = document.createElement('option');
                option1.value='One';
                option1.text = '1';
                select.appendChild(option1);
                var option2 = document.createElement('option');
                option2.value = 'Two';
                option2.text = '2';
                select.appendChild(option2);
                var option3 = document.createElement('option');
                option3.value = 'Three';
                option3.text = '3';
                select.appendChild(option3);
                li.appendChild(select);
                var circle = document.createElement('span');
                circle.style.background = 'linear-gradient(to right, red 33.3%, transparent 33.3%)';
                circle.classList.add('circle');
                li.appendChild(circle); 
                list.appendChild(li);
                count++;
                document.getElementById("input").value = "";
                const circles = document.querySelectorAll('.circle');
                const selects = document.querySelectorAll('select');
                selects.forEach((select,index) => {
                    select.addEventListener('change', (event) => { 
                        const value = event.target.value;
                        const circle = circles[index];
                        if (value === 'One') {
                            circle.style.background = 'linear-gradient(to right, red 33.3%, transparent 33.3%)';
                        } else if (value === 'Two') {
                            circle.style.background = 'linear-gradient(to right, red 66.6%, transparent 66.6%)';
                        } else {
                            circle.style.background = 'red';
                        }
                    })
                })
            }
        } 
    </script>*/