
import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class StudentCourses extends React.Component {

    state = {
        courses: [],
        showLoading: false,
        formControlCount: 1,
        courseObjects:[]
    }

    constructor(){
        super();
        this.iconStyle = {
            color: 'white',
            fontSize: '1.5rem',
        };
        this.apiUrl = "http://localhost:3001";
        this.courses = [];
        this.courseObjects = [];
    }


  
    
   
    componentDidMount() {
        
        axios.get(`${this.apiUrl}/getStudent/${this.props.match.params.studentId}`).then((result)=>{
            
            console.log(result.data.courses);
            this.courses =(result.data.courses);
           
            console.log(this.courses);

            this.courses.forEach(course =>{
                console.log(course);
                axios.get(`${this.apiUrl}/course/${course}`).then((result=>{
                    this.courseObjects.push(result.data);
                    console.log(this.courseObjects.length);
                    this.forceUpdate();
                }));
               
               
            }) ;
            console.log(this.courseObjects.length);
            
            
           
                
                
            
        });
     
    }

    render() {
        return <div>
            <div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Course Name</th>
        <th scope="col">Course Code</th>
        <th scope="col">Section</th>
        <th scope="col">Semester</th>
      </tr>
        
     {this.courseObjects.map((course,index)=>{
         return <tr>
             <td>{index}</td>
             <td key={index}>{course.courseName}</td>
             <td>{course.courseCode}</td>
             <td>{course.section}</td>
             <td>{course.semester}</td>
         </tr>
     })}
    </thead>
    <tbody>
     
    </tbody>
  </table>
</div>
        </div>;
    }
}

export default withRouter(StudentCourses);