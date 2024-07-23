var Addblog=document.getElementById('Add-blog')
var blogadd_section=document.querySelector('.blog-add-section')
var overlay=document.querySelector('.overlay')
var cancel_button=document.getElementById('cancel-button')
var add_button=document.getElementById('add_button')
var blog_title=document.getElementById('blog-title')
var short_notes=document.getElementById('short-notes')
var readMoreWindow=document.getElementById('.read-more-window')

//when user click the add button the add form will be display
Addblog.addEventListener("click",function(){
    overlay.style.display="block"
    blogadd_section.style.display="block"
    
})


cancel_button.addEventListener("click",function(event){  // create a function for cancel button
    event.preventDefault()
    overlay.style.display="none"
    blogadd_section.style.display="none"
    blog_title.required=true//click cancel button input required wil be false
    short_notes.required=true
})



//readmore Function
// Function to handle the "Read More" button click
function openModal(event) {
    const button = event.target;
    
    if (button.classList.contains('read-more')) {
        // Get the closest blog_item element
        const blogItem = button.closest('.blog_item');
        
        if (blogItem) {
            // Retrieve data attributes
            const blogTitle = blogItem.getAttribute('data-title');
            const blogShortnotes = blogItem.getAttribute('data-shortnotes');
            const blogContent = blogItem.getAttribute('data-content');
            
            // Populate the modal with blog details
            document.getElementById('modal-title').textContent = blogTitle;
            document.getElementById('modal-shortnotes').textContent = blogShortnotes;
            document.getElementById('modal-content').textContent = blogContent;
            
            // Display the modal
            document.getElementById('read-more-modal').style.display = 'block';
            overlay.style.display='block';
        }
    }
}

// Function to close the modal
function closeModal() {
    document.getElementById('read-more-modal').style.display = 'none';
    overlay.style.display='none';
}

// Add event listeners for modal close buttons
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.querySelector('.close-modal-button').addEventListener('click', closeModal);

// Add event listener to the parent container for "Read More" button clicks
document.getElementById('blogs').addEventListener('click', openModal);
