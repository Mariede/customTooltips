// -------------------------------------------------------------------------------------------------------
// eventos de mouseOver para captura de tooltips personalizados
// -------------------------------------------------------------------------------------------------------
window.onmouseover = function(ev) {

	ev = ev || window.event;

	ev.stopPropagation();
	ev.preventDefault();

	var targetEL = ev.target;
	if(targetEL) {

		var docBody = document.body;
		if(docBody) {

			var elTooltip = document.getElementById('_customTooltipID');
			if(elTooltip) {
				docBody.removeChild(elTooltip);
			}

			var targetName = targetEL.tagName;
			if(targetName != 'OPTION' && targetName != 'BODY' && targetName != 'HTML') {

				var targetTitle = _customTooltipCheck1(targetEL);
				if(targetTitle) {
					elTooltip = document.createElement('div');
					elTooltip.id = '_customTooltipID';
					elTooltip.className = 'customTooltip hover';
					elTooltip.innerHTML = targetTitle;

					docBody.appendChild(elTooltip);

					var mLocationX = (window.Event) ? ev.pageX : ev.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : docBody.scrollLeft);
					var mLocationY = (window.Event) ? ev.pageY : ev.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : docBody.scrollTop);

					var docBodyWidth = docBody.offsetWidth;
					var docBodyHeight = docBody.offsetHeight;

					var elTooltipWidth = elTooltip.offsetWidth;
					var elTooltipHeight = elTooltip.offsetHeight;

					var exceedX = (mLocationX + elTooltipWidth) - docBodyWidth;
					if(exceedX > 0) {
						elTooltip.style.left = (mLocationX - exceedX)+'px';
					} else {
						elTooltip.style.left = (mLocationX + 20)+'px';
					}

					var exceedY = (mLocationY + elTooltipHeight) - docBodyHeight;
					if(exceedY > 0) {
						elTooltip.style.top = (mLocationY - exceedY)+'px';
					} else {
						elTooltip.style.top = (mLocationY + 10)+'px';
					}

					if(targetName != 'A' && targetName != 'INPUT') {
						window.setTimeout(function() {
							var targetClassName = targetEL.className + '';
							if(targetClassName.indexOf(' customTooltipCursor') == -1) { targetEL.className += ' customTooltipCursor'; }
						}, 100);
					}
				}
			}
		}
	}
	return true;
}
window.onmouseout = function(ev) {

	ev = ev || window.event;

	ev.stopPropagation();
	ev.preventDefault();

	var targetEL =  ev.target;
	if(targetEL) {

		var docBody = document.body;
		if(docBody) {

			window.setTimeout(function() {
				var targetClassName = targetEL.className + '';
				if(targetClassName.indexOf(' customTooltipCursor') != -1) {
					targetClassName = targetClassName.replace(' customTooltipCursor','');
					targetEL.className = targetClassName;
					if(targetEL.className == '') { targetEL.removeAttribute('class'); }
				}
			}), 100;
		}
	}
	return true;
}
function _customTooltipCheck1(targetEL) {

	var els = [];
	var fRet = '';

	if(targetEL) {
		fRet = _customTooltipCheck2(targetEL);
		if(fRet == '') {
			while(targetEL) {
				if(targetEL.tagName == 'BODY') { break; }
				els.unshift(targetEL);
				targetEL = targetEL.parentNode;
				if(targetEL) {
					fRet = _customTooltipCheck2(targetEL);
					if(fRet != '') {
						break;
					}
				}
			}
		}
	}
	return fRet;
}
function _customTooltipCheck2(targetEL) {

	var fRet = '';

	if(targetEL) {
		if(!targetEL.title) {
			if(targetEL.attributes.getNamedItem('data-title')) {
				fRet = targetEL.attributes.getNamedItem('data-title').value;
			}
		} else {
			fRet = targetEL.title;
			if(targetEL.setAttribute) { targetEL.setAttribute('data-title',targetEL.title); }
			if(targetEL.removeAttribute) { targetEL.removeAttribute('title'); }
		}
	}
	return fRet;
}
// -------------------------------------------------------------------------------------------------------
