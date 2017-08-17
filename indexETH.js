// var dataPoints = [];

// $.getJSON("https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2017-08-15 ",function(data) {
// 	//console.log(data.bpi);

// 	$.each(data.bpi, function(key, value){
// 		//console.log(key);
// 		//console.log(value);

// 		var date = key.split("-");

// 		//console.log(date[0],date[1],date[2]);

//         //dataPoints.push({x: new Date(date[0],date[1],date[2]), y: value});
       
//        	dataPoints.push({x: new Date(key), y: value});
         
//     });

//     var chart = new CanvasJS.Chart("chartContainer",{
//         title:{
//             text:"Rendering Chart with dataPoints from External JSON"
//         },
//         axisX: {
//         	valueFormatString: "DD MMM 'YY"
//         },
//         data: [{
//         type: "line",
//             dataPoints : dataPoints,
//         }]
//     });
//     chart.render();
// });



var xyz = function() {
var startDate = new Date(2017,6,17);

var dataPoints = [];
var d = startDate;
var today = new Date(2017,7,17);
var currency = "ETH";
var dates = [];
var values = [];

while(d <= today)
{
	var date = d.getTime()/1000;

	//console.log(d);
	//console.log(date);
	var value;
	var data = [];
	var link = "https://min-api.cryptocompare.com/data/pricehistorical?fsym="+currency+"&tsyms=USD&ts="+date; 
	//console.log(link);

	$.ajax({ 
	    dataType:"json", 
	    url: link,
	    async: false,
	    success:function(data)
	    {
	        // do stuff.
	        console.log(d);
	        console.log(data.ETH.USD);
	        dates.push(d);
	        values.push(data.ETH.USD);
	        //dataPoints.push({x: d,y: data.BTC.USD});
	    }
	});

	// $.getJSON(link,function(data) {
	// 	//console.log(d);
	// 	console.log(data.BTC.USD);

	// 	values.push({x: d,y: data.BTC.USD});

	// });

	//console.log(d);
	//console.log(value);
	//dataPoints.push({x: d, y: value});

	d.setDate(d.getDate() + 1);
}

console.log(values);

var dataLink = "http://api.fixer.io/latest?base=USD";

var convertFactor;

$.ajax({ 
	    dataType:"json", 
	    url: dataLink,
	    async: false,
	    success:function(data)
	    {
	        // do stuff.
	        console.log(data.rates.INR);
	        convertFactor = data.rates.INR;
	    }
	});

console.log("PRICEEE");

console.log(convertFactor);

for(var i in values)
{
	values[i] = values[i] * convertFactor;
}

console.log(values);

d = startDate;
for(var i in values)
{
	dataPoints.push({x: new Date(d),y: values[i]});
	
	d.setDate(d.getDate() + 1);
	//console.log(values[i]);
}

console.log(dataPoints);
// var d = new Date(2017,6,16);
// var today = new Date(2017,7,16);
// var i = 0;
// while(d<today)
// {
// 	console.log(d);
// 	console.log(values[i]);
// 	d.setDate(d.getDate() + 1);
// 	i+=1;
// }

var chart = new CanvasJS.Chart("chartContainer"+currency,{
        title:{
            text:"Etherium - INR"
        },
        axisX: {
        	valueFormatString: "DD MMM 'YY"
        },
        data: [{
        type: "line",
            dataPoints : dataPoints,
        }]
});
chart.render();

};


xyz();