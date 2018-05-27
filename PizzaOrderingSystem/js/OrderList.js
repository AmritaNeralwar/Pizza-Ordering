var arrItems = []; 
var arrPrice=[];
var pizzaId=[];
var flag=0;
var count=1;


    
$(document).ready(function(){
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    $.getJSON( "server/Pizza.json", function( data ) {
        var out = "";
        $.each(data.Pizza, function(index, val) {
            out+=" <li class='pizza-list-box'>"
            +"<div class='p-box'><a class='col-12 p-deal-box' href='#' id='PizzaName_'"+val.id+"'>"
            +"<img src='"+val.url+"' class='img-responsive forTopMargin'><div>"
            +"<h4>"+val.name+"<br/></h4><h6><p class='text-center pull-right' style='margin:1%;margin-bottom:2%;'>"+val.ingredients+"</p></h6>"
            +"<h4><span>Worth @ <i class='fa fa-inr' style='color:#337ab7'></i>"
            +val.priceR+"</span></h4><div class='forBottomMargin'>"
            +"<button type='button' class='btn btn-info btn-lg' id='showmodal_"+index+"' onclick='show("+index+")' data-toggle='modal' data-target='#myModal'>Order Now</button>";
            +"</div></a></div></li>";
        });
    $("#id01").append(out);
    });

$("#LessQty").click(function(){
    var currentVal=$("#Qty").val();
    var price=$("#price").val();
    var priceInt=parseInt(price);
    var intValue=parseInt(currentVal);
    if(intValue!=1){
    $("#Qty").attr("value",intValue-1);
    $("#Qty").text(intValue-1);
    $("#Qty").val(intValue-1);
    $("#total").val( $("#total").val()-priceInt);
    }
   
 });
 $("#addQty").click(function(){
    var currentVal=$("#Qty").val();
    var price=$("#price").val();
    var priceInt=parseInt(price);
    var intValue=parseInt(currentVal)
    $("#Qty").attr("value",intValue+1);
    $("#Qty").text(intValue+1);
    $("#Qty").val(intValue+1);
    $("#total").val( $("#Qty").val()*priceInt);
 });
    $("#cartOpen").click(function(){
            var grandt=0;
            for(var j=0;j<arrPrice.length;j++){
                vargrandInt=parseInt(arrPrice[j]);
                grandt+=vargrandInt;
            }
             $("#Grandtot").text(grandt);
             var showtot= $("#Grandtot").text();
             if(showtot=="0"){
                $("#orderPlace").hide();
             }
        if($("#cart").is(':hidden'))
        {
            $("#cart").show();
        } else {
            $("#cart").hide();
            }
        });  
  
    $.getJSON( "server/Pizza.json", function( data ) {
        $.each(data.Pizza, function(index, val) {
            $('input[type=radio]').change(function(){
                $("#Qty").val(1);
                var id=$("#pizza_id").val();
            var size=$("input[name='pizza_size']:checked").val();
                if(size=='S'){
                    $("#price").val(val.priceS);
                    $("#total").val(val.priceS);
                }
                if(size=='R'){
                    $("#price").val(val.priceR);
                    $("#total").val(val.priceR);
                }
                if(size=='L'){
                    $("#price").val(val.priceL);
                    $("#total").val(val.priceL);
                }
                });
            });
        });
 
        $("#addToCart").click(function(){ $("#cart").css("display","none");
            var id=$("#pizza_id").val();
            var total=  $("#total").val();
            arrItems.push(parseInt(id));
            console.log(arrItems);
            var len=arrItems.length;
            var out="";
           var chk=0;
           flag=0;
           //count=1;
           count=$("#Qty").text();
          // $("#countId").text(count);
            $.getJSON( "server/Pizza.json", function( data ) {
                $.each(data.Pizza, function(index, val) {
             for(var i=0;i<len;i++){
                    if(id==index){
                    // var index=arrItems[i];
                        for(var j=0;j<pizzaId.length;j++){
                            if(val.id==pizzaId[j] && (chk==0)) {
                                flag=1;
                               // count=count+1;
                               //count=count+1;
                               count=parseInt($("#Qty").val())+parseInt($("#countId").text());
                                $("#countId").text(count);
                                var fTotal=parseInt($("#totalId").text())+parseInt($("#total").val());
                                $("#totalId").text(fTotal);
                                chk=1;
                                break;
                            }
                            
                   }
                   
                   if(flag==0){
                    out="<tr><td>"+val.name+"</td>"
                    +"<td id='countId'>"+$("#Qty").text()+"</td>"
                    +"<td id='totalId'>"+total+"</td></tr>";
                    // +"<td id='countId'>"+$("#Qty").text()+"</td></tr>";
                    pizzaId.push(val.id);
                    break;
                    }
                }
             }
            
            });
            $(listDisplay).append(out);
            arrPrice.push(total);
            //$("#Qty").val(1);
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            $("#orderPlace").show();
            // $("#orderPlace").hide();
        });
        });
        $("#orderPlace").click(function(){
                setTimeout(function()
                {location.reload(true)}, 3000);
            });
});
function show(i){
    $("#Qty").text(1);
    $("#Qty").val(1);
    $.getJSON( "server/Pizza.json", function( data ) {
        $.each(data.Pizza, function(index, val) {
            if(index==i){
            var name=val.name;
            $("#PizzaName").text(name);
            $("#pizza_id").attr("value",i);
            $("#price").val(val.priceR);
            $("#total").val(val.priceR);
            }
        });
    });
};
   