(function (window, undefined) {
    'use strict';
    idx(function () {
        if (!window.mobile) {
            var defaultPrices = JSON.parse(idx('#IDX-defaultPriceData').text());
            changeStatusFields();

            var updateMinMaxPrices = function updateMinMaxPrices(idxID, ptID) {
                idxID = idxID || 'all';
                ptID = ptID || 'all';
                var min = defaultPrices[idxID].min[ptID];
                var max = defaultPrices[idxID].max[ptID];
                idx('#IDX-lp').val(min);
                idx('#IDX-hp').val(max);
            };

            var getCurrentIdxID = function getCurrentIdxID() {
                return (!idx('[name="idxID"]').val()) ? 'all' : idx('[name="idxID"]').val();
            }

            var getCurrentPtID = function getCurrentPtID() {
                return (!idx('#IDX-pt').val()) ? 'all' : idx('#IDX-pt').val();
            }

            var updatePropertTypes = function updatePropertTypes(propTypes) {
                // Clean old.
                idx('#IDX-pt').empty();
                idx('#IDX-pt').append('<option value="">  All</option>');
                for (var key in propTypes) {
                    if (propTypes.hasOwnProperty(key)) {
                        idx('#IDX-pt').append('<option value="' + key + '">' + propTypes[key] + '</option>');
                    }
                }
                updateMinMaxPrices(getCurrentIdxID(), 'all');
            };

            idx('#IDX-pt').on('change', function () {
                updateMinMaxPrices(getCurrentIdxID(), getCurrentPtID());
                changeStatusFields();
            });

            updateMinMaxPrices(getCurrentIdxID(), getCurrentPtID());
            if ('geolocation' in navigator && document.location.protocol === 'https:') {
                idx('#IDX-userLocation').show().css('display', 'inline-block');
            }
        }

        // For mobile map.
        var cacheQueryCriteria, queryCriteria;
        idx('#IDX-mobile-mapsearch').on('pagebeforehide', function () {
            cacheQueryCriteria = buildQueryObject();
            idx.mobile.hidePageLoadingMsg();
            if ("undefined" !== map && map) {
                L.DomEvent.removeListener(map, 'moveend', triggerMapChange);
            }
        });

        idx('#IDX-mapAlert').hide();
        idx('#IDX-mapSearch').click(function (e) {
            e.preventDefault();
            refreshButtonClick();
        });
        idx('button.IDX-close').click(function (e) {
            e.preventDefault();
            idx(this).parent('#IDX-mapAlert').hide();
        });

        idx('#IDX-userLocation').off('click').on('click', function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            } else {
                alert('Location gathering is not supported by your browser');
            }

            function success(position) {
                // Make sure all windows are closed.
                idx('.IDX-mapControlWindow').hide();
                // Recenter the map.
                storeZoom();
                recenterMapTo(position.coords.latitude, position.coords.longitude, true); // move the map

                // Initiate map move procedures and fade out the refresh button.
                triggerMapChange();
                idx('#IDX-mapRefresh' + uniqueID).fadeOut('fast');

                // Run a fresh search.
                refreshMap();
            }

            function error(msg) {
                if (console) {
                    console.error(msg);
                }
                idx('#IDX-userLocation').html('Not Available');
            }
        });
        /**
         * Change Prop Type specific core field select options
         */
        function changeOptions(selector, options) {
            let element = idx(selector);
            let html = '';

            // check that there even is a prop sub type element
            if (element.size()) {
                if (idx(options).size() > 0) {
                    let multipleSelect = (element.prop('type'));

                    idx.each(options, function (key, value) {
                        // multiple select option html
                        if (multipleSelect)
                            html += '<option value="' + value + '">' + value + '</option>';
                    });
                    element.html(html);

                    element.closest('.IDX-control-group').removeClass('IDX-noData');
                } else {
                    element.children().remove();
                    element.closest('.IDX-control-group').addClass('IDX-noData');
                }
            }
            //refresh the jquery mobile select menus
            if (mobile) {
                element.selectmenu('refresh');
            }
            return true;
        }

        /**
         * change the core fields because the prop type has change
         */
        function changeStatusFields(init) {
            let pt = null;
            const statuses = idx.parseJSON(idx('#IDX-allStatuses').text());

            if (idx('#IDX-pt').size()) {
                pt = idx('#IDX-pt').val();
                if (pt === '') {
                    const allStatuses = []
                    for (const propType in statuses) {
                        statuses[propType].filter((x) => {
                            if (allStatuses.indexOf(x) === -1) {
                                allStatuses.push(x)
                            }
                        })
                    }
                    changeOptions('#IDX-propStatus', allStatuses);
                }
            }

            // populate status with pt statuses
            if (idx(statuses).size() > 0 && pt !== '')
                changeOptions('#IDX-propStatus', statuses[pt]);
        }
    });
})(window);
