var yyy=document.getElementById('xxx');
var context=yyy.getContext('2d');
var eraserEnable=false;
eraser.onclick=function(){
    eraserEnable=true
    eraser.classList.add('active')
    pen.classList.remove('active')                //点了给自己加个戏（类）,别人减戏
}
pen.onclick=function(){
    eraserEnable=false
    pen.classList.add('active')                  
    eraser.classList.remove('active')                
}
clearAll.onclick=function(){
    context.clearRect(0,0,yyy.width,yyy.height)

}
download.onclick=function(){
    var url=yyy.toDataURL("image/png")
    var a=document.createElement('a')
    document.body.appendChild(a)
    a.href=url
    a.download='painting'
    a.target='_blank'
    a.click()
}
red.onclick=function(){
    red.classList.add('active')                  
    blue.classList.remove('active')  
    yellow.classList.remove('active') 
    context.strokeStyle='red'

}
blue.onclick=function(){
    blue.classList.add('active')                  
    red.classList.remove('active')  
    yellow.classList.remove('active') 
    context.strokeStyle='blue'
    black.classList.remove('active') 

}
yellow.onclick=function(){
    yellow.classList.add('active')                  
    blue.classList.remove('active')  
    red.classList.remove('active') 
    black.classList.remove('active') 
    context.strokeStyle='yellow'

}
black.onclick=function(){
    black.classList.add('active')                  
    blue.classList.remove('active')  
    red.classList.remove('active') 
    yellow.classList.remove('active') 
    context.strokeStyle='black'
}
thin.onclick=function(){
    thin.classList.add('active')                  
    thick.classList.remove('active') 
    context.lineWidth=2
}
thick.onclick=function(){
    thick.classList.add('active')                 
    thin.classList.remove('active')  
    context.lineWidth=5
}

autocanvasSize(yyy)

listenToUser(yyy)

function listenToUser(canvas){
    var using=false
    var lastpoint={"x":undefined,"y":undefined}

    if(document.body.ontouchend !== undefined){
        canvas.ontouchstart=function(aaa){
            var x=aaa.touches[0].clientX
            var y=aaa.touches[0].clientY
            using=true
            if(eraserEnable){
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastpoint={"x":x,"y":y}
            }
        }
        canvas.ontouchmove=function(aaa){
            var x=aaa.touches[0].clientX
            var y=aaa.touches[0].clientY
            if(using){
                if(eraserEnable){
                    context.clearRect(x-5,y-5,10,10)
                }else{
                    var newpoint={"x":x,"y":y}
                    drawLine(lastpoint.x,lastpoint.y,newpoint.x,newpoint.y)
                    lastpoint=newpoint
                }
            }
        }
        canvas.ontouchend=function(aaa){
            using=false
        }
    }else{
        canvas.onmousedown=function(aaa){
            var x=aaa.clientX
            var y=aaa.clientY
            using=true
                if(eraserEnable){
                    context.clearRect(x-5,y-5,10,10)
                }else{
                    lastpoint={"x":x,"y":y}
                }
            }
        canvas.onmousemove=function(aaa){
            var x=aaa.clientX
            var y=aaa.clientY
            if(using){
                if(eraserEnable){
                    context.clearRect(x-5,y-5,20,20)
                }else{
                    var newpoint={"x":x,"y":y}
                    drawLine(lastpoint.x,lastpoint.y,newpoint.x,newpoint.y)
                    lastpoint=newpoint
                }
            }
        }
        canvas.onmouseup=function(aaa){
            using=false
        }
    }
}
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineTo(x2,y2)
    context.stroke()//我一开始忘记了这一行
    context.closePath()
}
function autocanvasSize(canvas){
    canvasSize()
    window.onresize=function(){
        canvasSize()
    }
function canvasSize(){
    var pageHeight=document.documentElement.clientHeight
    var pageWidth=document.documentElement.clientWidth
    canvas.height=pageHeight
    canvas.width=pageWidth
    }
}








