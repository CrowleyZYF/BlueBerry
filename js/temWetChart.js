var temWetChart=(function(){
    //所有变量的声明以及初始化

    var canvas,
        context,
        canvasWidth,//画布的宽
        canvasHeight,//画布的高
        x=new Array(),
        y=new Array(),
        xNumber,
        yNumber,
        yBeginX=50,
        yBeginY=50,
        pointX=50,
        pointY,
        xEndX,
        xEndY=400,
        yFontGap=35,
        xFontGap=20,
        xFontBegin,
        yGap,
        xGap,
        pointPosition,
        hurtMax=40,
        hurtMin=0,
        warningMaxY=30,
        warningMinY=10,
        warningMaxX=95,
        warningMinX=30,
        goodMaxY=25,
        goodMinY=20,
        goodMaxX=90,
        goodMinX=85,
        myData,




        clearCanvas = function (x,y,w,h) {
            context.clearRect(x,y,w,h);
        },

        redraw = function () {
            var drawBoard=function(){
                    context.save();
                    context.beginPath();                    
                    context.strokeStyle="#8D8D8D";
                    context.moveTo(pointX,pointY);
                    context.lineTo(yBeginX,yBeginY);
                    context.moveTo(pointX,pointY);
                    context.lineTo(xEndX,xEndY);
                    context.lineWidth=1;
                    context.stroke();
                    context.closePath();
                    context.restore();
                    context.save();
                    context.beginPath();                    
                    context.strokeStyle="#DEDEDE";
                    context.lineCap="round";
                    context.lineJoin="round";
                    context.font="12px 微软雅黑";
                    context.fillStyle="#232323";
                    for(var i=0;i<yNumber;i++){
                        context.fillText(y[i].toString()+"℃",yBeginX-yFontGap,pointY-i*yGap+5);
                    }
                    for(var i=0;i<xNumber;i++){
                        context.fillText(x[i].toString()+"%",pointX+(i)*xGap-15,pointY+xFontGap);
                        context.moveTo(pointX+i*xGap,pointY);
                        context.lineTo(pointX+i*xGap,yBeginY);
                    }
                    context.stroke();
                    context.closePath();
                    context.restore();
                    for(var i=0;i<yNumber-1;i++){
                        context.save();
                        context.beginPath();
                        context.moveTo(yBeginX,pointY-(i+1)*yGap);
                        context.lineTo(xEndX,pointY-(i+1)*yGap);
                        context.strokeStyle="#DEDEDE";
                        context.lineWidth=1;
                        context.stroke();
                        context.closePath();
                        context.restore();
                    }                    
                    /*
                    context.save();
                    context.beginPath(); 
                    context.globalAlpha=0.4;                   
                    context.fillStyle="#ff0202";
                    context.fillRect(50,200,570,120);
                    context.closePath();
                    context.restore();
                    */
                    //最适合生长区域
                    context.save();
                    context.beginPath();                    
                    context.strokeStyle="#49FB47";
                    context.lineWidth=2;
                    //context.strokeRect(yBeginX+HGMIN*(xEndX-yBeginX)/100,xEndY-(TGMAX+Math.abs(y[0]))*(xEndY-yBeginY)/(Math.abs(y[0])+y[y.length-1]),(HGMAX-HGMIN)*(xEndX-yBeginX)/100,(TGMAX-TGMIN)*(xEndY-yBeginY)/(Math.abs(y[0])+y[y.length-1]));
                    context.strokeRect(yBeginX+goodMinX*(xEndX-yBeginX)/100,xEndY-(goodMaxY+Math.abs(y[0]))*(xEndY-yBeginY)/(Math.abs(y[0])+y[y.length-1]),(goodMaxX-goodMinX)*(xEndX-yBeginX)/100,(goodMaxY-goodMinY)*(xEndY-yBeginY)/(Math.abs(y[0])+y[y.length-1]));
                    context.closePath();
                    context.restore();
                    //告警区域
                    context.save();
                    context.beginPath();                    
                    context.strokeStyle="#FB19FC";
                    context.lineWidth=2;
                    context.strokeRect(yBeginX+warningMinX*(xEndX-yBeginX)/100,xEndY-(warningMaxY+Math.abs(y[0]))*(xEndY-yBeginY)/(Math.abs(y[0])+y[y.length-1]),(warningMaxX-warningMinX)*(xEndX-yBeginX)/100,(warningMaxY-warningMinY)*(xEndY-yBeginY)/(Math.abs(y[0])+y[y.length-1]));
                    context.closePath();
                    context.restore();
                    //伤害上限
                    context.save();
                    context.beginPath();                    
                    context.strokeStyle="#D70019";
                    context.lineWidth=2;
                    context.moveTo(yBeginX,pointY-(hurtMax+Math.abs(y[0]))*(xEndY-yBeginY)/(Math.abs(y[0])+y[y.length-1]));
                    context.lineTo(xEndX,pointY-(hurtMax+Math.abs(y[0]))*(xEndY-yBeginY)/(Math.abs(y[0])+y[y.length-1]));
                    context.stroke();
                    context.closePath();
                    context.restore();
                    //伤害下限
                    context.save();
                    context.beginPath();                    
                    context.strokeStyle="#D70019";
                    context.lineWidth=2;
                    context.moveTo(yBeginX,pointY-(hurtMin+Math.abs(y[0]))*(xEndY-yBeginY)/(Math.abs(y[0])+y[y.length-1]));
                    context.lineTo(xEndX,pointY-(hurtMin+Math.abs(y[0]))*(xEndY-yBeginY)/(Math.abs(y[0])+y[y.length-1]));
                    context.stroke();
                    context.closePath();
                    context.restore();
                    //
                    context.save();
                    context.beginPath();                     
                    context.lineWidth=2;                   
                    context.fillStyle="#FD6801";
                    context.fillRect(pointX+200,pointY+40,14,14);
                    context.fillStyle="#49FB47";
                    context.fillRect(pointX+400,pointY+40,14,14);
                    context.fillStyle="#FB19FC";
                    context.fillRect(pointX+600,pointY+40,14,14);
                    context.fillStyle="#D70019";
                    context.fillRect(pointX+800,pointY+40,14,14);
                    context.closePath();
                    context.restore();                    
                    context.fillText("温度",pointX-28,yBeginY-25);
                    context.fillText("湿度",xEndX+10,xEndY+5);
                    context.fillText("温室实际环境",pointX+220,pointY+52);
                    context.fillText("最适合生长区域",pointX+420,pointY+52);
                    context.fillText("告警区域",pointX+620,pointY+52);
                    context.fillText("伤害区域",pointX+820,pointY+52);
                    context.font="18px 微软雅黑";
                    context.fillText("温湿度分布图",pointX+480,yBeginY-20);
                };

            
            //全部更新
            //var count=data.length;
            clearCanvas(0,0,canvasWidth,canvasHeight);
            drawBoard();
            context.restore();
            context.strokeStyle="#FF6800";
            context.fillStyle="white";
            context.lineWidth=3;
            for(var i=0;i<myData.length;i++){
                context.save();
                context.beginPath();
                context.arc(yBeginX+myData[i][0]*(xEndX-yBeginX)/100,pointY-(parseFloat(myData[i][1])+(Math.abs(y[0])))*(xEndY-yBeginY)/(Math.abs(y[0])+y[y.length-1]),5,0,Math.PI*2,true);
                context.fill();
                context.stroke();
                context.closePath();
                context.restore();
            }

        },

        init = function (pWidth,pHeight,pX,pY,data,TRMIN,TRMAX,TPMIN,TPMAX,TGMIN,TGMAX,HPMIN,HPMAX,HGMIN,HGMAX) {
            canvasWidth=pWidth;
            canvasHeight=pHeight;
            x=pX;
            y=pY;
            xNumber=pX.length;
            yNumber=pY.length;
            myData=data;
            pointY=canvasHeight-100;
            xEndX=canvasWidth-80;
            xEndY=pointY;
            yGap=(pointY-yBeginY)/(yNumber-1);
            xGap=(xEndX-pointX)/(xNumber-1);
            xFontBegin=(xGap-10)/2;
            pointPosition=xGap/2;
            goodMinX=HGMIN;
            goodMaxX=HGMAX;
            goodMinY=TGMIN;
            goodMaxY=TGMAX;
            warningMinX=HPMIN;
            warningMaxX=HPMAX;
            warningMinY=TPMIN;
            warningMaxY=TPMAX;
            hurtMax=TRMAX;
            hurtMin=TRMIN;
            canvas = document.createElement('canvas');
            canvas.setAttribute('width', canvasWidth);
            canvas.setAttribute('height', canvasHeight);
            canvas.setAttribute('id', 'riskCanvas');
            document.getElementById('riskGrade').appendChild(canvas);
            if (typeof G_vmlCanvasManager !== "undefined") {
                canvas = G_vmlCanvasManager.initElement(canvas);
            }
            context = canvas.getContext("2d");
            redraw();
        };
    return {
        init:init
    };
}());
