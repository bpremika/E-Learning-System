export interface CourseDto {
  id:            number           
  name:          string
  category:      string
  course_desc:   string
  students?: StudentUserDto[]
  Instructor?: InstructorUserDto[]
}

export interface StudentUserDto {
  id:           number      
  username:     string   
  email:        string   
  password:     string
  first_name:   string
  last_name:    string
  phone_number: string
  courses?: CourseDto[]
}

export interface InstructorUserDto {
  id:           number      
  username:     string   
  email:        string   
  password:     string
  first_name:   string
  last_name:    string
  phone_number: string
  courses?:       CourseDto[]
}
