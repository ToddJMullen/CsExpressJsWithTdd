$(function(){

    $.get("/blocks", appendToList );

    function appendToList(blocks){
        var list = [];
        for( var i in blocks ){
            var block = blocks[i];
            content = "<a href='#' data-block='" + block + "'>"
                + "<i class='glyphicon glyphicon-remove-circle'></i></a>"
                + " <a href='/blocks/" + block + "'>" + block + "</a>";
            list.push($("<li>", {html: content, class: "list-group-item"}));
        }
        $('.block-list').append(list);
    }

    $("form").on("submit", function(event){
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize();

        $.ajax({
            type:"POST", url:"/blocks", data: blockData
        }).done(function(blockName){
            appendToList([blockName]);
            $('form').trigger('reset');
        });
    });

    $('.block-list').on("click", 'a[data-block]', function deleteBlock(event){
//        event.preventDefault();
        var target = $(event.currentTarget);//get the specifc link in a[data-block] that was clicked
        if (!confirm("Are you sure you want to delete '" + target.data("block") + "'?")) {
            return false;
        }

        $.ajax({
            type:"DELETE", url:"/blocks/" + target.data("block")
        }).done(function handleDeleted(){
            target.parents("li").remove();
        });

    });


});