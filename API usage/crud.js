$(function(){
    addRecipe();
    $("#addRecipe").on("click", ".btn-danger", deleteRecipe);
});

function deleteRecipe(){
    var btn = $(this);
    var record = btn.closest("#recipe");
    let id = record.attr("dataid");
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method:"DELETE",
        error: function(){
            $("#recipe").append("Error occured, Record not deleted");
        },
        success:function(){
            addRecipe();
        }

    });
}

function addRecipe(){

    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method : "GET",
        error: function(){
            $("#addRecipe").html("Error occured");
        },
        success: function(response){

            var reci = $('#addRecipe');
                reci.empty();
                for(var i=0; i<response.length; i++){
                    var rec = response[i];
                    reci.append(`<div id="recipe" dataid="${rec._id}"><h5>${rec.title}</h5><button class="btn btn-danger float-right">Delete</button><button class="btn btn-warning float-right">Edit</button><p>${rec.body}</p></div>`);
                }
            }
    });
}