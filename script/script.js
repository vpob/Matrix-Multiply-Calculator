var matrixA = {};
var matrixB = {};
var radioValue = 3;


$(document).ready(function(){

/* Set paremeter of each matrix*/
 maxtrixParam()
 
/* Validate number enter and 
        Change left panel color if action is*/      
$(document).on('focus', '.matInput', function(){
    errBackground(0)
    $('.left').css("background-color", "#5199DB");  
});
$(document).on('blur','.matInput', function(){
    errBackground(0)
    $('.left').css("background-color", "#BCBCBC");
});
$(document).on('keyup', '.matInput',function(){
    var num = /^[0-9.,-]+$/;    
       if(this.value.match(num)){
                $('#valueError').hide();
            }else{
                $('#valueError').show();
                errBackground(1);
            }
});
function errBackground(err){
        if(err)
        $('.left').css("background-color", "#F6C1C0");
        else{
        $('.left').css("background-color", "#BCBCBC");
        $('#errBlock p').hide();
        $('#valueError').hide();
        
        }
    }      
    
    /* Check the value of Radio input */
$('.radioButton input').on('change', function(){
        radioValue = $('input[name=matrixRad]:checked', '.radioButton').val();
});

    /* Global Button Listener  */
$('#ParentForContent').on('click', function(e){
        var target = $(e.target);
    
    if(target.is('.multButton')){
        multyPly()
       }
    else if(target.is('.clearMatrix')){
        errBackground(0)
        clearMatrix();
    }
    else if(target.is('.switchMatrix')){
        swMatrix();
    }
    else if(target.is('.addRemRow .addButton')){
        errBackground(0)
        addRow(radioValue)
    }
    else if (target.is('.addRemRow .remButton')){
        errBackground(0)
        remRow(radioValue);
    }
    else if (target.is('.addRemCol .addButton')){
        errBackground(0)
        addColoumn(radioValue)
    }
    else if (target.is('.addRemCol .remButton')){
        errBackground(0)
        remColoumn(radioValue)
    }

});

    
            /*   Functions  */ 

    /* Setting parametrs of matrix*/  
function maxtrixParam(){

        /* Set the parameters of matrixA*/
    var rowCont = $('.aMatBorder tbody > tr').length;
    var colCount = $('.aMatBorder tr:nth-child(1) td').length;
    matrixA = {
        rowNumb: rowCont,
        colNumb: colCount,
        totCellNumb: rowCont*colCount
    } 
        /* Set the parameters of matrixA*/
    var rowCont = $('.bMatBorder tbody > tr').length;
    var colCount = $('.bMatBorder tr:nth-child(1) td').length;
    
    matrixB = {
        rowNumb: rowCont,
        colNumb: colCount,
        totCellNumb: rowCont*colCount
    } 
 }   
    
    /* Check the maximum alowed value of matrix */
function maxCellCheker(matColValue, matCurrRow){
    maxtrixParam()
var err = false;
if((matColValue <= 5) || (matCurrRow <= 5)){ 
       
       if((matColValue == 5) && (matCurrRow == 2)){
        return err = true;
       }else if((matCurrRow == 3) && (matColValue == 3)){
       return err = true;
       }else if((matCurrRow == 5) && (matColValue == 2)){
       return err = true;
       }
    return err;
}}
    
    /* Add a row  */   
function addRow(matrix){
var err = 'Невозможно добавить строку! \n это превысит максимально допустимый размер матрицы';   
var matSelector, matColValue, matArgument, matCurrRow;
        /* Check current parameters of matrix */
    maxtrixParam()
        /* Select matrix element in DOM */
    switch(matrix){
        case '0': matSelector = $('.aMatBorder tbody'); matColValue = matrixA.colNumb; 
                  matArgument = 'a';                    matCurrRow = matrixA.rowNumb;     
            break;
        case '1': matSelector = $('.bMatBorder tbody'); matColValue = matrixB.colNumb; 
                  matArgument = 'b';                    matCurrRow = matrixB.rowNumb;      
            break;
        default: alert('Error by adding Row \n Please select matrix first');
    }
     /* Check max value of sells in mitrix */
    if((matCurrRow == 2) && (matColValue == 4)){  
            alert(err);
            return;
    }
    else if((matCurrRow == 5) && (matColValue == 1)){
            alert(err);
            return;
    }
    else if(maxCellCheker(matColValue, matCurrRow) == true){
            alert(err);
            return;
    }
    /* Add a row to matrix an then append a cels */
    matSelector.append('<tr></tr>');    
        for(var i=0; i<matColValue; i++){  
                    matSelector.children(':last').append(
                                                   '<td><input class="matInput col'+ (i+1) +'" type="text" placeholder="'
                                                  + matArgument + (matCurrRow+1) + ',' + (i+1) + '" />');
        }
    }
    /* Add a column */   
function addColoumn(matrix){
var matSelector, matColValue, matArgument, matCurrRow;
var err = 'Невозможно добавить столбец! \n это превысит максимально допустимый размер матрицы';     
    /* Find out current parameters of matrix */
    maxtrixParam()
    /* Select matrix element in DOM */
       switch(matrix){
        case '0': matSelector = $('.aMatTable tbody > tr'); matColValue = matrixA.colNumb; 
                  matArgument = 'a';                        matCurrRow = matrixA.rowNumb;
            break;
        case '1': matSelector = $('.bMatTable tbody > tr'); matColValue = matrixB.colNumb; 
                  matArgument = 'b';                        matCurrRow = matrixB.rowNumb;
            break;
        default: alert('Error by adding Column \n Please select matrix first');
    }
        
      /* Check max value of sells in mitrix */  
    if((matCurrRow == 4) && (matColValue == 2)){  
            alert(err);
            return;
    }
    else if((matCurrRow == 1) && (matColValue == 5)){
            alert(err);
            return;
    }
    else if(maxCellCheker(matColValue, matCurrRow) == true){
            alert(err);
            return;
    }
    
        /* all a cell in Column */
        matSelector.each(function (i, j){
            $(this).append('<td><input class="matInput col'+ (matColValue+1) +'" type="text" placeholder="' 
                           + matArgument + (i+1) + ',' + (matColValue+1) + '"/></td>');
        });
 }   
    /* Remove a row */
function remRow(matrix){
     var matSelector, matColValue, matArgument, matCurrRow;
     /* Find out current parameters of matrix */
    maxtrixParam()
     /*select matrix*/
       switch(matrix){
        case '0': matSelector = $('.aMatTable tbody '); matColValue = matrixA.colNumb; 
                  matArgument = 'a';                    matCurrRow = matrixA.rowNumb;  
            break;
        case '1': matSelector = $('.bMatTable tbody '); matColValue = matrixB.colNumb; 
                  matArgument = 'b';                    matCurrRow = matrixB.rowNumb;
            break;
        default: alert("Error \n Can`t remove Row \n Please select matrix first");
    }
    
    /* If we try to remove last row sell*/
    if((matColValue <= 1) || (matCurrRow <= 1)){ 
       if (matCurrRow <= 2){
        alert('Минимальное количество строк в матрице \nне может быть меньше одной');
        return;
       }
    }  
        /*remove row*/
    matSelector.children(':last').remove();
    
}
    /* Remove a column */
function remColoumn(matrix){
     var matSelector, matColValue, matArgument, matCurrRow;
     /* Find out current parameters of matrix */ 
    maxtrixParam()
     /* Select the matrix */
       switch(matrix){
        case '0': matSelector = $('.aMatTable tbody tr'); matColValue = matrixA.colNumb; 
                  matArgument = 'a';                      matCurrRow = matrixA.rowNumb;   
            break;
        case '1': matSelector = $('.bMatTable tbody tr'); matColValue = matrixB.colNumb; 
                  matArgument = 'b';                      matCurrRow = matrixB.rowNumb;  
            break;
        default: alert("Error \n Can`t remove Column \n Please select matrix first");
    }
    
    /* If we try to remove last coloum sell*/
    if((matColValue == 1) || (matCurrRow == 1)){ 
       if (matColValue <= 2){  
        alert('Минимальное количество столбцов в матрице \nне может быть меньше одного');
        return;
       }
    }
        /*remove Column*/
    matSelector.each(function (i, j){
            $(this).children(':last').remove();
        });
    
}

   
/* Multiply function */    
function multyPly(){
   
    
/*Check current parameters of matrix and trow error if its no allowed to multiply*/
maxtrixParam()
if(matrixA.colNumb != matrixB.rowNumb){
    $('#errBlock p').show();
    errBackground(1);
    return;
}     
    
/* Create array where we will store data from matrix */    
var row1aMatrix = [],   col1bMatrix = [];
var row2aMatrix = [],   col2bMatrix =[];
var row3aMatrix = [],   col3bMatrix =[];
var row4aMatrix = [],   col4bMatrix =[];
var row5aMatrix = [],   col5bMatrix =[];     
                                                                /* get data from 1st col of matrix B */
$('.bMatrix tr input').filter('.col1').each(function (){ 
        col1bMatrix.push($(this).val());
 });
                                                                /* get data of 1st row of matrix A */
$('.aMatTable tr:nth-child(1) input').each(function (){ 
        row1aMatrix.push($(this).val());
 });
                                                                /* get data from 2nd col of matrix B */
$('.bMatrix tr input').filter('.col2').each(function (){ 
        col2bMatrix.push($(this).val());
 });
                                                                /* get data of 2nd row of matrix A */
$('.aMatTable tr:nth-child(2) input').each(function (){ 
        row2aMatrix.push($(this).val());
 });
                                                                /* get data from 3th col of matrix B */
$('.bMatrix tr input').filter('.col3').each(function (){ 
        col3bMatrix.push($(this).val());
 });
                                                                /* get data of 3th row of matrix A */
$('.aMatTable tr:nth-child(3) input').each(function (){ 
        row3aMatrix.push($(this).val());
 });
                                                                    /* get data from 4th col of matrix B */
$('.bMatrix tr input').filter('.col4').each(function (){ 
        col4bMatrix.push($(this).val());
 });
                                                                /* get data of 4th row of matrix A */
$('.aMatTable tr:nth-child(4) input').each(function (){ 
        row4aMatrix.push($(this).val());
 });
                                                                       /* get data from 5th col of matrix B */
$('.bMatrix tr input').filter('.col5').each(function (){ 
        col5bMatrix.push($(this).val());
 });
                                                                /* get data of 5th row of matrix A */
$('.aMatTable tr:nth-child(5) input').each(function (){ 
        row5aMatrix.push($(this).val());
 });

    
//                        
//                      ***   Multiply   ***
//    
//            Array for solution matrix
    var solRow1array = [], solRow2array = [], solRow3array = [];
    var solRow4array = [], solRow5array = [];
    
            /* Solution matrix Rows  */
solRow1array[0] = (row1aMatrix[0] * col1bMatrix[0]) + (row1aMatrix[1] * col1bMatrix[1]);                                    
solRow1array[1] = (row1aMatrix[0] * col2bMatrix[0]) + (row1aMatrix[1] * col2bMatrix[1]);     
solRow1array[2] = (row1aMatrix[0] * col3bMatrix[0]) + (row1aMatrix[1] * col3bMatrix[1]);
solRow1array[3] = (row1aMatrix[0] * col4bMatrix[0]) + (row1aMatrix[1] * col4bMatrix[1]);
solRow1array[4] = (row1aMatrix[0] * col5bMatrix[0]) + (row1aMatrix[1] * col5bMatrix[1]);
solRow2array[0] = (row2aMatrix[0] * col1bMatrix[0]) + (row2aMatrix[1] * col1bMatrix[1]);    
solRow2array[1] = (row2aMatrix[0] * col2bMatrix[0]) + (row2aMatrix[1] * col2bMatrix[1]);
solRow2array[2] = (row2aMatrix[0] * col3bMatrix[0]) + (row2aMatrix[1] * col3bMatrix[1]);  
solRow2array[3] = (row2aMatrix[0] * col4bMatrix[0]) + (row2aMatrix[1] * col4bMatrix[1]);
solRow2array[4] = (row2aMatrix[0] * col5bMatrix[0]) + (row2aMatrix[1] * col5bMatrix[1]);

solRow3array[0] = (row3aMatrix[0] * col1bMatrix[0]) + (row3aMatrix[1] * col1bMatrix[1]);
solRow3array[1] = (row3aMatrix[0] * col2bMatrix[0]) + (row3aMatrix[1] * col2bMatrix[1]);
solRow3array[2] = (row3aMatrix[0] * col3bMatrix[0]) + (row3aMatrix[1] * col3bMatrix[1]);
solRow3array[3] = (row3aMatrix[0] * col4bMatrix[0]) + (row3aMatrix[1] * col4bMatrix[1]);
solRow3array[4] = (row3aMatrix[0] * col5bMatrix[0]) + (row3aMatrix[1] * col5bMatrix[1]);
    
solRow4array[0] = (row4aMatrix[0] * col1bMatrix[0]) + (row4aMatrix[1] * col1bMatrix[1]);
solRow4array[1] = (row4aMatrix[0] * col2bMatrix[0]) + (row4aMatrix[1] * col2bMatrix[1]);
solRow4array[2] = (row4aMatrix[0] * col3bMatrix[0]) + (row4aMatrix[1] * col3bMatrix[1]);
solRow4array[3] = (row4aMatrix[0] * col4bMatrix[0]) + (row4aMatrix[1] * col4bMatrix[1]);
solRow4array[4] = (row4aMatrix[0] * col5bMatrix[0]) + (row4aMatrix[1] * col5bMatrix[1]);

solRow5array[0] = (row5aMatrix[0] * col1bMatrix[0]) + (row5aMatrix[1] * col1bMatrix[1]);
solRow5array[1] = (row5aMatrix[0] * col2bMatrix[0]) + (row5aMatrix[1] * col2bMatrix[1]);
solRow5array[2] = (row5aMatrix[0] * col3bMatrix[0]) + (row5aMatrix[1] * col3bMatrix[1]);
solRow5array[3] = (row5aMatrix[0] * col4bMatrix[0]) + (row5aMatrix[1] * col4bMatrix[1]);
solRow5array[4] = (row5aMatrix[0] * col5bMatrix[0]) + (row5aMatrix[1] * col5bMatrix[1]);
    
                /*  When length Row in MAtrixA greater then Row in Matrix B  */    
    if(row1aMatrix[2]){  
                solRow1array[0] += (row1aMatrix[2] * col1bMatrix[2]);
                solRow1array[1] += (row1aMatrix[2] * col2bMatrix[2]);
                solRow2array[0] += (row2aMatrix[2] * col1bMatrix[2]);
                solRow2array[1] += (row2aMatrix[2] * col2bMatrix[2]);
                solRow3array[0] += (row3aMatrix[2] * col1bMatrix[2]);
                solRow3array[1] += (row3aMatrix[2] * col2bMatrix[2]);
        if(row1aMatrix[3]){  
                solRow1array[0] += (row1aMatrix[3] * col1bMatrix[3]);
                solRow1array[1] += (row1aMatrix[3] * col2bMatrix[3]);
                solRow2array[0] += (row2aMatrix[3] * col1bMatrix[3]);
                solRow2array[1] += (row2aMatrix[3] * col2bMatrix[3]);
                solRow3array[0] += (row3aMatrix[3] * col1bMatrix[3]);
                solRow3array[1] += (row3aMatrix[3] * col2bMatrix[3]);
        }
        else if(row1aMatrix[4]){ 
                solRow1array[0] += (row1aMatrix[4] * col1bMatrix[4]);
                solRow1array[1] += (row1aMatrix[4] * col2bMatrix[4]);
                solRow2array[0] += (row2aMatrix[4] * col1bMatrix[4]);
                solRow2array[1] += (row2aMatrix[4] * col2bMatrix[4]);
                solRow3array[0] += (row3aMatrix[4] * col1bMatrix[4]);
                solRow3array[1] += (row3aMatrix[4] * col2bMatrix[4]);
            }
    }
    
            /* Check the how mutch rows will have matrix*/
    var numbRow = 1;
    if(solRow2array[0]) numbRow = 2;
    if(solRow3array[0]) numbRow = 3;
    if(solRow4array[0]) numbRow = 4;
    if(solRow5array[0]) numbRow = 5;
            /* Go to draw function to create our solution matrix*/
drawMatrix(solRow1array.length,numbRow,'c');    
            
            /*Submit value to solutionMatrix cells*/
$('.solMatrixTable tbody > tr input').prop("disabled", false);
$('.solMatrixTable tbody').each(function (){ 
    $(this).find('tr:nth-child(1) input').each(function(i, j){
        $(this).val(solRow1array[i]);
    });
    $(this).find('tr:nth-child(2) input').each(function(i, j){
        $(this).val(solRow2array[i]);
    });
    $(this).find('tr:nth-child(3) input').each(function(i, j){
        $(this).val(solRow3array[i]);
    }); 
    $(this).find('tr:nth-child(4) input').each(function(i, j){
        $(this).val(solRow4array[i]);
    });
    $(this).find('tr:nth-child(5) input').each(function(i, j){
        $(this).val(solRow5array[i]);
    });
 });
 $('.solMatrixTable tbody > tr input').prop("disabled", true);   
    

    

}   
    /*Clear matrix */
function clearMatrix(){
    $('.matInput').val('');  
}
    /* Switch matrix */
function swMatrix(){
 maxtrixParam()       
var row1aMatrix = [],row2aMatrix = [], row3aMatrix = [], row4aMatrix = [], row5aMatrix = []
var row1bMatrix = [], row2bMatrix =[], row3bMatrix =[], row4bMatrix =[], row5bMatrix =[]


                                                                /* get data from 1st col of matrix B */
$('.bMatTable tr:nth-child(1) input').each(function (){ 
        row1bMatrix.push($(this).val());
 });
                                                                /* get data of 1st row of matrix A */
$('.aMatTable tr:nth-child(1) input').each(function (){ 
        row1aMatrix.push($(this).val());
 });
                                                                /* get data from 2nd col of matrix B */
$('.bMatTable tr:nth-child(2) input').each(function (){ 
        row2bMatrix.push($(this).val());
 });
                                                                /* get data of 2nd row of matrix A */
$('.aMatTable tr:nth-child(2) input').each(function (){ 
        row2aMatrix.push($(this).val());
 });
                                                                /* get data from 3th col of matrix B */
$('.bMatTable tr:nth-child(3) input').each(function (){ 
        row3bMatrix.push($(this).val());
 });
                                                                /* get data of 3th row of matrix A */
$('.aMatTable tr:nth-child(3) input').each(function (){ 
        row3aMatrix.push($(this).val());
 });
                                                                    /* get data from 4th col of matrix B */
$('.bMatTable tr:nth-child(4) input').each(function (){ 
        row4bMatrix.push($(this).val());
 });
                                                                /* get data of 4th row of matrix A */
$('.aMatTable tr:nth-child(4) input').each(function (){ 
        row4aMatrix.push($(this).val());
 });
                                                                       /* get data from 5th col of matrix B */
$('.bMatTable tr:nth-child(5) input').each(function (){ 
        row5bMatrix.push($(this).val());
 });
                                                                /* get data of 5th row of matrix A */
$('.aMatTable tr:nth-child(5) input').each(function (){ 
        row5aMatrix.push($(this).val());
 });

            /*Draw matrix B*/
drawMatrix(matrixA.colNumb, matrixA.rowNumb, 'b')
            /* set value to matrixB cells */
 $('.bMatTable').each(function (){ 
    $(this).find('tr:nth-child(1) input').each(function(i, j){
        $(this).val(row1aMatrix[i]);
    });
    $(this).find('tr:nth-child(2) input').each(function(i, j){
        $(this).val(row2aMatrix[i]);
    });
    $(this).find('tr:nth-child(3) input').each(function(i, j){
        $(this).val(row3aMatrix[i]);
    }); 
    $(this).find('tr:nth-child(4) input').each(function(i, j){
        $(this).val(row4aMatrix[i]);
    });
    $(this).find('tr:nth-child(5) input').each(function(i, j){
        $(this).val(row5aMatrix[i]);
    });
 });   
    
           /*Draw matrix A*/
drawMatrix(matrixB.colNumb, matrixB.rowNumb, 'a')
            /* set value to matrixB cells */
 $('.aMatTable').each(function (){ 
    $(this).find('tr:nth-child(1) input').each(function(i, j){
        $(this).val(row1bMatrix[i]);
    });
    $(this).find('tr:nth-child(2) input').each(function(i, j){
        $(this).val(row2bMatrix[i]);
    });
    $(this).find('tr:nth-child(3) input').each(function(i, j){
        $(this).val(row3bMatrix[i]);
    }); 
    $(this).find('tr:nth-child(4) input').each(function(i, j){
        $(this).val(row4bMatrix[i]);
    });
    $(this).find('tr:nth-child(5) input').each(function(i, j){
        $(this).val(row5bMatrix[i]);
    });
 });       
     
}
    
    
function drawMatrix(rowLength, indexRow, matrixName){
var currentMatrix = matrixName; // Varible-selector for matrix
    /* Wich matrix we will draw */
switch(matrixName){
    case 'a': currentMatrix = $('.aMatTable');
    break;
    case 'b': currentMatrix = $('.bMatTable');
    break;
    case 'c': currentMatrix = $('.solMatrixTable');
    break;
    default: currentMatrix = alert('Error when try draw cells fro matrix');
}    
    
 /* Remove cells first */   
currentMatrix.find('tbody').empty(); 
    
    /*Create row for matrix*/
for(var i=0; i<indexRow; i++){
    currentMatrix.append('<tr></tr>')
}
    /* Create cells for matrix*/
currentMatrix.find('tbody tr').each(function(rowCount){
    
    if(matrixName === 'c'){
    for(var i=0; i<indexRow; i++){
    $(this).append('<td><input class="matInput col'+ (i+1) +'" type="text" placeholder="'
                                                           + matrixName + (rowCount+1) + ',' + (i+1) +'"/>')
    }
    }else{
        for(var i=0; i<rowLength; i++){
    $(this).append('<td><input class="matInput col'+ (i+1) +'" type="text" placeholder="'
                                                           + matrixName + (rowCount+1) + ',' + (i+1) +'"/>')
 
}}});  
}
    
    
});