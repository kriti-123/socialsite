{
     let craetePost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                    console.log(data);
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
     }

     let newPostDom = function(post){
        return $(`
        <li id="post-${post._id}">
        <p>
                <small>
                    <a class="delete-post-button"href="/posts/destroy/${post._id}">delete</a>
                </small>
                    ${post.content}
                        <br>
                        <small>
                            ${post.user.name}
                        </small>
                        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                            
                        </small>
        </p>
        <div class="post-comments">
           
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment..."
                        required>
                    <input type="hidden" name="post" value=" ${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
    
                        </ul>
                    </div>
        
        </div>
    
    </li>
    
        `)
    }

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
     craetePost();
}