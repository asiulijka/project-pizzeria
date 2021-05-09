const optArticleTagsSelector = '.post-tags .list';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClasssPrefix = 'tag-size-';

function calculateTagsParams(tags){
  const params = {max: 0, min: 999999};

  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return (optCloudClasssPrefix + classNumber);
}

function generateTags(){
  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let newTagsListHTML = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){
      const linkHTMLData = {jsTag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      newTagsListHTML = newTagsListHTML + linkHTML;

      if(!allTags[tag]){
        allTags[tag]=1;
      }else{
        allTags[tag]++;
      }
    }
    const tagsList = article.querySelector('div.post-tags ul');
    tagsList.innerHTML = newTagsListHTML;
  }

    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    const allTagsData = {tags: []};

    for(let tag in allTags){
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag +'">' + tag + '</a></li>\n';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-','');
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  let activeTagLinks = document.querySelectorAll("a[href='" + href + "']");

  for (let activeTagLink of activeTagLinks){
    activeTagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  const links = document.querySelectorAll('a[href^="#tag-"]');
  for(let link of links){
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();
