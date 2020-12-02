---
layout: post
title: "A new kind of image search"
excerpt: Old-school image search isn’t good enough these days, and was never really an image search in the first place.
---

‘Search’ entered the public consciousness at a time when a person’s interaction with the internet was largely an interaction with text, and in many ways, the algorithms we use to explore the web have stayed the same since then. In the meantime, the internet has become a much faster, more fluid, and more visual place.

When you run a search within a huge catalogue of images like the one we have at Wellcome Collection, almost all search algorithms will examine the words in your query, compare them to the words in all of the images’ captions, and return those with the largest overlap. The algorithm’s designer might incorporate one or two extra mathematical tricks, but the algorithm is never much more than ‘check whether the words match’.

To return precise, meaningful matches, this technique relies on images having thoroughly descriptive captions.

![D’Orbigny, Voyage pittoresque dans les deux Amériques.](https://iiif.wellcomecollection.org/image/L0023425.jpg/full/full/0/default.jpg)
_This is how we hunted for images before search boxes were invented | [D’Orbigny, Voyage pittoresque dans les deux Amériques.](https://wellcomecollection.org/works/k524qkjg) [CC BY](https://creativecommons.org/licenses/by/4.0/)_

‘Check whether the words match’ might have been sufficient in a world which was text-heavy, but images, video, and audio are the content types we interact with most today, whether they’re captioned or not. An image is invisible to this approach if isn’t attached to some text, and a huge amount of un-captioned stuff continues to sit around in storage while the algorithms in place do nothing to show it to users. The algorithms which grew up in a world of text aren’t smart enough to keep up on their own today.

![A man is pointing to the Latin inscription on a plinth. Etching by D. Lizars.](https://iiif.wellcomecollection.org/image/V0039272.jpg/full/full/0/default.jpg)
_Checking whether the words match | [A man is pointing to the Latin inscription on a plinth. Etching by D. Lizars.](https://wellcomecollection.org/works/dmxp7x4p) [CC BY](https://creativecommons.org/licenses/by/4.0/)_

These problems are particularly prescient for Wellcome Collection, where we’re producing thousands of images of digitised works every day. The speed at which we’re digitising makes the material impossible to catalogue in sufficient detail as it’s being produced, but from our users’ perspective, until the works are searchable, they might as well not exist.

## The technical bit

Modern machine learning has given data scientists tools to describe non-numeric data numerically — an artwork’s visual features, the sound of a persons voice, or the meaning of the word ‘dog’ can all be encoded as a compact array of numbers. If done well, those arrays can be compared to one another, allowing us to suggest similar artwork or to power predictive-text, among other things.

However, the spaces described by these arrays are separate, and without the injection of some human understanding it’s been impossible to transfer knowledge from word-vector space to image-feature-vector space, or vice-versa. It’s easy to compare an image to an image, but comparing an image to some text is much harder.

![Fruit and Vegetables — Year 2000 prices.](https://iiif.wellcomecollection.org/image/N0021596.jpg/full/full/0/default.jpg)
_Separate vector spaces - they’re like apples and oranges | [Fruit and Vegetables — Year 2000 prices. Credit: Sue Snell.](https://wellcomecollection.org/works/arx8xs5b) [CC BY](https://creativecommons.org/licenses/by/4.0/)_

Enter [DeViSE](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/41473.pdf), a largely ignored research paper which came out of Google in 2012. DeViSE is a terrible name for an incredibly powerful technique. Broken down, it stands for _Deep Visual-Semantic Embedding_; the _visual-semantic embedding_ referring to a shared space in which images and text can theoretically exist, and _deep_ referring to the fact that we use deep neural networks to put them there.

The key insight in the DeViSE paper was to create a shared space for words and images. In this shared space, the array describing the word _‘dog’_ would be exactly the same as the array describing an image of a dog.

When we’re able to embed an image in word vector space, real image search becomes possible. Even if a collection of images has no associated text whatsoever, we can figure out their positions in this new, shared space and measure the distance between them and a known query word. Intuitively, the closest images to the query word should be the most relevant search results!

We’re no longer searching against text and returning the connected images here — this new method uses nothing but the images’ visual features to connect them to a user’s query.

![data](/assets/images/devise/data.png)
_Known points in word vector space and image feature vector space, with no meaningful mapping between them_

![learning](/assets/images/devise/learning.png)
_Using known image-label pairs, we learn how to jump between text- and image-space_

![inference](/assets/images/devise/inference.png)
_Using the inferred mapping, we can make reasonable guesses about where the position of a new, unseen point from one space might be in the other._

Things get slightly more complicated in practice. While words are well understood individually, we don’t have an accepted way of representing longer sequences. Being restricted to word-space alone means that our users would only be able to search with single-word queries, and longer, more detailed queries would become meaningless.

Progress is being made on the sentence-vector problem though, and recent work by teams at [Google](https://arxiv.org/abs/1803.11175) and [Facebook](https://arxiv.org/abs/1705.02364) inspired us to build our own sentence encoder. This gives us a much richer and more complex space to work with, in which single words and longer sequences are universally represented as useful arrays. Most importantly, queries with shared meaning are positioned in similar regions of the space, even in the case where none of the words within them overlap.

## TL;DR

The combination of all of the technical stuff boils down to this: The machine now has a decent understanding of what your queries mean, and what kind of corresponding visual features should appear in the results. When you hit ‘search’, the machine actually looks at all the images in the collection before making a decision about which ones are most relevant - there’s no ‘check whether the words match’ here.

## The results

Let’s run a few queries through the new algorithm and see what it comes up with.

`an old wooden boat`
![](/assets/images/devise/boat_1.jpg)
![](/assets/images/devise/boat_2.jpg)
![](/assets/images/devise/boat_3.jpg)

`a group of children`
![](/assets/images/devise/children_1.jpg)
![](/assets/images/devise/children_2.jpg)
![](/assets/images/devise/children_3.jpg)

`sheep`
![](/assets/images/devise/sheep_1.jpg)
![](/assets/images/devise/sheep_2.jpg)
![](/assets/images/devise/sheep_3.jpg)

`surgical instruments`
![](/assets/images/devise/surgical_1.jpg)
![](/assets/images/devise/surgical_2.jpg)
![](/assets/images/devise/surgical_3.jpg)

`mri brain scan`
![](/assets/images/devise/brain_1.jpg)
![](/assets/images/devise/brain_2.jpg)
![](/assets/images/devise/brain_3.jpg)

One of these brains is not like the others…

`simulations of protein structure`
![](/assets/images/devise/protein_1.jpg)
![](/assets/images/devise/protein_2.jpg)
![](/assets/images/devise/protein_3.jpg)

`skeletons in excessively dramatic poses`
![](/assets/images/devise/skeleton_1.jpg)
![](/assets/images/devise/skeleton_2.jpg)
![](/assets/images/devise/skeleton_3.jpg)

The queries above are reasonably broad, and fit a usage pattern we’d expect for a non-expert who isn’t familiar with what’s in the collection; We’d expect that someone searching for `sheep` would be happy with any images of sheep.

However, this new kind of search is also useful if the user is looking for an particular work whose subject matter is relatively unique in the collection. The user doesn’t need to remember the work’s exact title, just an approximate description of what’s going on in the image. For instance:

`a woman is riding a horse and it's jumping over a hedge`
![](/assets/images/devise/horse.jpg)

## Dangers

These algorithms are never perfect and need to be introduced cautiously. The most notorious example of well-intentioned computer vision gone awry was the ‘Google gorillas’ incident in 2015, which rightly generated huge backlash.

We’re not exempt from these pitfalls. Sometimes the machine’s mistakes are innocent enough - it obviously can't find any `cows on the beach`, so gives us hippos in a river instead:

![](/assets/images/devise/cows.jpg)

But while the point about caution should be taken seriously in any domain, it’s especially true when working with material as sensitive as ours.

Wellcome is primarily a medical collection, and as a result we hold a lot of instructive medical images. When we started testing the new tool internally, we discovered that the algorithm struggled to distinguish between images of meaty-looking-stuff in the context of food-preparation, and meaty-looking-stuff in the context of surgery. Because of the algorithm’s strong visual-semantic links and the tight cluster of foody-words in word-vector space, users searching for ‘cake’ or ‘iceberg’ would be served up gory images of surgical procedures.

This is obviously something we’re working to avoid putting in front of our users…

## How are we using this at Wellcome?

In reality, a combination of techniques will almost always provide the best results, so _'check whether the words match'_ will be around in Wellcome Collection’s search bar for a while longer, probably working in tandem with the new visual search. Our query encoder might also be used as a third prong, matching against the existing captions.
The new search tool seems like an almost universally useful technology though, so it’s likely to find applications in all sorts of areas at Wellcome beyond the search bar. We’re particularly excited about using it as an internal tool for cataloguers and researchers working with our archives, where very little textual metadata currently exists.

## Still want to know more?

We work openly at Wellcome, and all of the platform team’s code is available for anyone to read and reuse, including everything I’ve produced in the /data_science folder. The research I’ve described above is documented in much more detail in a set of jupyter notebooks, alongside the working code I used to produce the results above. Feel free to get in touch on twitter if you have any questions!
