import React from 'react'
import Card from './Card'

function CompositionDemo() {
    return (
        <div> 
            {/* Ex 1: Composing a Student Card */}
            <Card title="Student Info">
                <p>Name: Amit</p>
                <p>Course: MCA</p>
                <button>View Grades</button>
            
            </Card>

            {/* Ex 2: Composing a Welcome Message */}
            <Card title="Welcome!">
                <p>We are glad you are learning React today.</p>
            </Card>

            {/* Ex 3: Composing a Dashboard */}
            <Card title="Dashboard">
                <p>Welcome User!</p>
                <button>Sign Up</button>
            </Card>

            <Card title="Demooooooo">
                <p>Welcome User!</p>
                <button>Clickkkk</button>
            </Card>

        </div>
    );
}

export default CompositionDemo
