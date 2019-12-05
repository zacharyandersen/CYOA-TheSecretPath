/* 
 *  Each story has 'id', 'text' 'paths'
 *  Each path has 'target' which should point to specific story id and 'text' as display value.
 */
$(document).ready(function() {
  // jQuery targets
  var
    $storyContainer = $("#story-container"),
    $pathContainer = $("#path-container"),
    $specialContainer = $("#special-container"),
    $imgContainer = $("#img-container");

  var name;
  
  var stories = [
    {
      id: 0,
      text: "\"Awaken, my child. Your journey is only beginning.\"",
      paths: [
        {target: 1, text: "Hello?"},
        {target: 1, text: "Who's there?"}
      ]
    },
    {
      id: 1,
      text: "You call out to the mysterious voice, startling yourself with the sound of your own voice and snapping out of your daze. Blinking, you look around and take in your surroundings. You're lying in a fluffy, green bed of moss surrounded by towering trees. Light breaks through the canopy, illuminating the particles in the air and giving everything around you a dreamlike appearance. You stand up, walking over to a nearby pond. Looking down, you see a reflection of yourself. You see: ",
      paths: [
        {target: 2, text: "A man"},
        {target: 3, text: "A woman"}
      ]
    },
    {
      id: 2,
      text: "You see yourself in the reflection, hair messy, beard unkempt. How long were you out? What are you doing here? You think, trying to at least remember your name.",
      paths: [
        {target: 4, text: "Remember your name"}
      ]
    },
    {
      id: 3,
      text: "No girls allowed. THE END."
    },
    {
      id: 4,
      text: "That's right, your name is " + name + ". Remembering that brings you a small sense of comfort. Finally feeling like your senses and awareness have returned, you decide what your first step is in figuring out what in the world is going on.",
      paths: [
        {target: 5, text: "5"},
        {target: 6, text: "6"}
      ]
    }
  ]

  // Takes paths object and return it as button element with custom attribute.
  function getPathHTML(paths) {
    return paths.map(function(path) {
      return '<button class="path-btn" data-target=' + path.target + '>' + path.text + '</button>'
    }).concat();
  }

  // Takes story object and return paragraph element with story text.
  function getStoryHTML(story) {
    return '<p class="story-text">' + story.text + '</p>'
  }

  // Check if the story is ending story.
  function isEnded(story) {
    if (story.paths)
      return false;
    return true;
  }
  
  // Takes id and displays interactive story.
  function displayInteractiveStory(stories, id) {
    var story = stories[id];

    var $story = $(getStoryHTML(story));
    $story.hide();
    $story.fadeIn(1000);

    $storyContainer.append($story);

    if (id == 4) {
      getName();
    }  

    if (isEnded(story))
      $pathContainer.html('<button class="path-btn" data-target="replay">Replay?</button>');
    else  
      $pathContainer.html(getPathHTML(story.paths));
  }

  function getName() {
    name = prompt("Please enter your name:", "Harry Potter");
    return name;
  }
  
  // Event handler that will setup and invoke displayInteractiveStory()
  // Event delegation makes sure child element of $pathContainer listens to event.
  $pathContainer.click(function(event) {
    var $pathBtn = $(event.target);
    var nextStoryId = $pathBtn.attr('data-target');
    // I want to refactor this part as it looks ugly and easily breaks.
    if (nextStoryId === 'replay') {
      $storyContainer.html('');
      $pathContainer.html('');
      displayInteractiveStory(stories, 0);
    } else
      displayInteractiveStory(stories, nextStoryId);
  });
   

  // Display initial story on inital render
  // story with id 0 refers to start of the story.
  displayInteractiveStory(stories, 0);
});