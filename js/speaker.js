$(document).ready(function() {
  $.getJSON('./data/speakers.json', function(json) {
    var html = '';
    if (Object.keys(json) == 0) {
      html += '<h1>No speakers found</h1>';
    } else {
      $.each(json, function(key, value) {
        if (value.length > 0) {
          html += '<h3>' + key + '</h3>';
          for (var i = 0; i < value.length; i++) {
            item = value[i];
            html +=
              '<figure class="speaker-cards"><div class="profile-image"><img src="' +
              item.profile_image +
              '"alt="profile-sample2" /></div><figcaption><h3>' +
              item.Name +
              '</h3><h5>' +
              item.Designation +
              '</h5><span><i class="fa fa-map-marker" aria-hidden="true"></i> ' +
              item.City;
            if (item.Description) {
              html += '<br><p>' + item.Description + '</p>';
            }
            if (item.proposal_link) {
              html +=
                '<p id="proposal-link"><i class="fa fa-file"></i> <a href="' +
                item.proposal_link +
                '">Speaker Bio</a></p>';
            }
            if (item.social_links.twitter) {
              html +=
                '<div class="icons"><a href="' +
                item.social_links.twitter +
                '"><i class="fa fa-twitter"></i></i></a>';
            }
            if (item.social_links.linkedin) {
              html +=
                '<a href="' +
                item.social_links.linkedin +
                '"><i class="fa fa-linkedin"></i></i></a>';
            }
            if (item.social_links.github) {
              html +=
                '<a href="' +
                item.social_links.github +
                '"><i class="fa fa-github"></i></i></a>';
            }
            if (item.social_links.website) {
              html +=
                '<a href="' +
                item.social_links.website +
                '"><i class="fa fa-globe"></i></i></a>';
            }
            html += '</div></figcaption></figure>';
          }
        }
      });
    }
    $('.speakers').append(html);
  });
});
