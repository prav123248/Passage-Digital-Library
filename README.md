# Passage - Digital Library System

### Description :
As an avid reader, a gap I found in book reading platforms such as Goodreads and Storygraph is an appealing interface for books read. Existing platforms such as those
two focus on the community and statistics side at the expense of capturing the style of physical bookshelves. Passage is a digital library system designed to focus 
solely on the interface and providing an adequate user experience for managing books.

#### Main Library Interface
![bookView](https://user-images.githubusercontent.com/78224090/193417096-262cfd5e-65a5-4509-a14b-8d918562dd24.PNG)

The main interface is a responsive grid view of book covers with extra details such as genre, pagecount or author being displayed on hover. These details are easy to add
as the system makes use of the OpenLibrary API, meaning users can use URLs in the right format to automatically fill in detail fields. This means data does not need to be 
entered manually which can be tedious.

#### To Read Interface (with Hover)
![hoverView (2)](https://user-images.githubusercontent.com/78224090/193417203-42d26e5e-8be1-4990-95b0-661506d7541e.PNG)
The above image showcases how book details from the database are displayed. On hover, the cover is darkened and the data is displayed.

### Technologies used :
    - HTML/CSS/Javascript
    - React JS including components from Material UI and Primereact
    - React Bootstrap
    - Django with an Sqllite database
    - Django Rest Framework
    - OpenLibrary API

### Functionalities implemented :
    - Grid view interface of book and relevant data from the database
    - Adding books with OpenLibrary API to automatically fill in fields
    - Updating existing book data in the database
    - Removing book data from the database

### Setup :
    (01) - Install Node and Pip
    (02) - Open CMD in the same directory as manage.py
    (03) - Type "cd frontend" in CMD
    (04) - Install libraries using the command "npm install"
    (05) - Enter command "npm run build"
    (06) - Install Django, djangorestframework and urllib3 with command "pip install Django djangorestframework urllib3"
    (07) - Enter command "cd .." to return to the manage.py directory
    (08) - Run command "python manage.py makemigrations bookDatabase"
    (09) - Run command "python manage.py migrate"
    (10) - Run command "python manage.py"
    (11) - Go to the address specified for the development server
    
