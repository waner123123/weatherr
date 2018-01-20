// 获取所有的城市信息
let cities,weatherobj;

$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
    cities = obj.data;
    for(let k in cities){
    	let section = document.createElement('section');
        let cities_title = document.createElement('h1');
        cities_title.className = "cities_title";
        cities_title.innerHTML = k;
        section.appendChild(cities_title);
        for(let j in cities[k]){
        	let cities_list = document.createElement('ul');
        	cities_list.className = "cities_list";
        	let li = document.createElement('li');
        	li.innerHTML = j;
        	cities_list.appendChild(li);
        	section.appendChild(cities_list);
        }
        $(".cities_box").append(section);
    }
	}
});

$.getScript("https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
    getFullWeather(remote_ip_info.city);
});

function getFullWeather(nowcity){
    $(".now_city").html(nowcity);
// 获取当前城市天气信息
$.ajax({
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
		dataType:"jsonp",
		success:function(obj){
		    weatherobj = obj.data;
		    console.log(weatherobj);
		    console.log(weatherobj);
		    // 当前的空气质量
		    $(".now_air_quality").html(weatherobj.weather.quality_level);
		    // 当前的气温
		    $(".now_temp_temp").html(weatherobj.weather.current_temperature);
		    // 当前的风力
            $(".now_wind_quality").html(weatherobj.weather.wind_level+"级");
            // 当前的天气状态
            $(".now_weather").html(weatherobj.weather.current_condition);

            // 近期两天的天气
            
            // 今天的温度
            // 今天的最高温度
            $(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
             // 今天的最低温度
            $(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
            // 今天的天气状况
            $(".today_weather").html(weatherobj.weather.day_condition);
            // 今天的天气状况图标
            $(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");



            // 明天的温度
            // 明天的最高温度
            $(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
            // 明天的最低温度
            $(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
            // 明天的天气状况
            $(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);
            // 明天的天气状况图标
            $(".tomorrow_img").attr('src',"img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");


            // 未来二十四小时的天气
            
            let hours_array = weatherobj.weather.hourly_forecast;
	            
            for(let i = 0;i < hours_array.length;i++){
            	// 创建元素并添加到页面中
            	let hours_list = document.createElement('li');
                let hours_block = document.createElement('span');
            	hours_block.className = 'hours_block';

	            let hours_img = document.createElement('img');
	            hours_img.className = 'img';

	            let hours_temp = document.createElement('span');
	            hours_temp.className = 'hours_temp';

	            hours_list.appendChild(hours_block);
	            hours_list.appendChild(hours_img);
	            hours_list.appendChild(hours_temp);

	            $('.hours_content').append(hours_list);

	           
                // 当下的时间
                hours_block.innerHTML = hours_array[i].hour+":00";
                hours_img.setAttribute('src',"img/"+hours_array[i].weather_icon_id+".png");
                hours_temp.innerHTML = hours_array[i].temperature+"°";
        
            }

            let week_array = weatherobj.weather.forecast_list; 
            for(let i = 0;i < week_array.length;i++){
            	let week_list = document.createElement('li');
            	let week_date = document.createElement('span');
            	week_date.className = 'week_date';

            	let week_am_weather = document.createElement('span');
	            week_am_weather.className = 'week_am_weather';

	            let week_am_img = document.createElement('img');
	            week_am_img.className = 'week_am_img';

	            let week_temp_max = document.createElement('span');
            	week_temp_max.className = 'week_temp_max';

            	let week_temp_min = document.createElement('span');
            	week_temp_min.className = 'week_temp_min';

            	let week_wind_title = document.createElement('span');
            	week_wind_title.className = 'week_wind_title';

            	let week_wind_quality = document.createElement('span');
            	week_wind_quality.className = 'week_wind_quality';

            	week_list.appendChild(week_date);
            	week_list.appendChild(week_am_weather);
            	week_list.appendChild(week_am_img);
            	week_list.appendChild(week_temp_max);
            	week_list.appendChild(week_temp_min);
            	week_list.appendChild(week_wind_title);
            	week_list.appendChild(week_wind_quality);

            	$('.week_content').append(week_list);
                
                week_date.innerHTML = week_array[i].date.substring(5,7)+"/"+week_array[i].date.substring(8);
            	week_am_weather.innerHTML = week_array[i].condition;
            	week_am_img.setAttribute('src',"img/"+week_array[i].weather_icon_id+".png");
            	week_temp_max.innerHTML = week_array[i].high_temperature;
            	week_temp_min.innerHTML = week_array[i].low_temperature;
            	week_wind_title.innerHTML = week_array[i].wind_direction;
            	week_wind_quality.innerHTML = week_array[i].wind_level+"级";


				}
			}
		})

$(function(){
	$(".now_city").on("click",function(){
	$(".find").val("");
	$(".confirm").html('取消');
	$(".cities").css("display","block");

	
	})
	// 事件委派（动态获取的元素获取不到）
	$("body").delegate(".cities_list li","click",function(){
		let son = this.innerHTML;
        getFullWeather(son);
        $(".cities").css("display","none");
	})

	$("body").delegate(".cities_title","click",function(){
		let son = this.innerHTML;
        getFullWeather(son);
        $(".cities").css("display","none");
	})

	$(".find").on("focus",function(){
		$(".confirm").html('确认');
	})

	
		$(".confirm").on("click",function(){
			if(this.innerText == "取消"){
				 $(".cities").css("display","none");
			}else if(this.innerText == "确认"){
				let text = $(".find").val();
				for(let k in cities){
					if(text == k){
						getFullWeather(text);
						$(".cities").css("display","none");
						return;
					}else{
						for(let j in cities[k]){
							if(text == j){
								getFullWeather(text);
								$(".cities").css("display","none");
								return;
							}
						}
					}
				}
				alert("输入地区有误");
				$(".find").val("");
				$(".confirm").html('取消');
			}
		})
	})
}
