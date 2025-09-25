import React, { useState, useEffect } from 'react';

const ScentGuessGame = () => {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  // Game data with local asset paths
  const products = [
    {
      name: "Keep My Colour Blonde Toning Spray",
      scent: "Strawberry",
      image: "./assets/keep-my-colour-blonde-toning-spray.png",
      description: "A leave in spray with heat protection to neutralise brassiness and enhance blonde tones in hair. Spray sans rinçage avec protection thermique pour neutraliser les tons cuivrés et intensifier les tons blonds dans les cheveux.",
      productType: "spray"
    },
    {
      name: "Miracle Spray Hair Treatment",
      scent: "Watermelon", 
      image: "./assets/miracle-spray-hair-treatment.png",
      description: "Delivering eleven benefits your hair will love. Leave in hair treatment. Add shine, smoothness and softness. Control frizz & flyaways. Moisturise. Strengthen fragile hair. Prevent split ends. Detangle & create manageability. Protect against heat styling. Enhance natural body. Repair dry damaged hair. Protect hair colour with UV filters. Prevent sun damage.",
      productType: "spray"
    },
    {
      name: "Deep Clean Clarifying Shampoo",
      scent: "Orange",
      image: "./assets/deep-clean-clarifying-shampoo.png",
      description: "A daily cleansing shampoo that removes excess oil from the hair and scalp. For all hair types. Un shampooing nettoyant quotidien qui enlève l'excès d'huile des cheveux et du cuir chevelu. Pour tous types de cheveux.",
      productType: "shampoo"
    },
    {
      name: "Detangle My Hair Leave-In Spray", 
      scent: "Pear",
      image: "./assets/detangle-my-hair-leave-in-spray.png",
      description: "A lightweight detangler with pear extract to hydrate and tame hair. For all hair types. Démêlant léger à l'extrait de poire pour hydrater et dompter les cheveux. Pour tous types de cheveux.",
      productType: "spray"
    },
    {
      name: "Miracle Hair Mask",
      scent: "Coconut",
      image: "./assets/miracle-hair-mask.png",
      description: "A blend of Aloe Vera and White Mulberry Leaf to restore and treat lost moisture, this antioxidant rich formula will leave hair feeling strong and hydrated. Perfect for colour treated hair. Un mélange d'Aloe Vera et de Feuille de Mûrier Blanc pour restaurer et traiter l'humidité perdue, cette formule riche en antioxydants laissera les cheveux forts et hydratés. Parfait pour les cheveux colorés.",
      productType: "mask"
    }
  ];

  const fruitOptions = ["Strawberry", "Watermelon", "Orange", "Pear", "Coconut"];
  
  // In your local version, replace these with your actual fruit image paths
  // Example: "./assets/strawberry.jpg" if you have them in an assets folder
  const fruitImages = {
    "Strawberry": "./assets/strawberry.jpg", 
    "Watermelon": "./assets/watermelon.jpg", 
    "Orange": "./assets/orange.jpg", 
    "Pear": "./assets/pear.jpg", 
    "Coconut": "./assets/coconut.jpg" 
  };

  const fruitEmojis = {
    "Strawberry": "🍓",
    "Watermelon": "🍉", 
    "Orange": "🍊",
    "Pear": "🍐",
    "Coconut": "🥥"
  };

  // Function to shuffle array for randomizing answer options
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Generate randomized fruit options for current question
  const getRandomizedFruitOptions = () => {
    return shuffleArray(fruitOptions);
  };

  // Confetti animation component
  const ConfettiAnimation = () => {
    useEffect(() => {
      const confettiContainer = document.getElementById('confetti-container');
      if (confettiContainer) {
        // Create confetti pieces
        for (let i = 0; i < 50; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'confetti-piece';
          confetti.style.left = Math.random() * 100 + '%';
          confetti.style.animationDelay = Math.random() * 2 + 's';
          confetti.style.backgroundColor = ['#FF6B6B', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'][Math.floor(Math.random() * 5)];
          confettiContainer.appendChild(confetti);
        }
      }
    }, []);

    return (
      <>
        <style>{`
          #confetti-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1000;
          }
          
          .confetti-piece {
            position: absolute;
            width: 10px;
            height: 10px;
            animation: confettiFall 3s linear infinite;
          }
          
          @keyframes confettiFall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          
          .firework {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 4px;
            height: 4px;
            border-radius: 50%;
            animation: fireworkExplode 1s ease-out infinite;
          }
          
          @keyframes fireworkExplode {
            0% {
              box-shadow: 0 0 0 0 #FF6B6B,
                          0 0 0 0 #4CAF50,
                          0 0 0 0 #2196F3,
                          0 0 0 0 #FF9800;
              opacity: 1;
            }
            100% {
              box-shadow: 0 -50px 0 20px transparent,
                          50px 0 0 20px transparent,
                          0 50px 0 20px transparent,
                          -50px 0 0 20px transparent,
                          35px -35px 0 15px transparent,
                          -35px -35px 0 15px transparent,
                          35px 35px 0 15px transparent,
                          -35px 35px 0 15px transparent;
              opacity: 0;
            }
          }
        `}</style>
        <div id="confetti-container"></div>
        <div className="firework" style={{animationDelay: '0s'}}></div>
        <div className="firework" style={{animationDelay: '0.5s', top: '30%', left: '70%'}}></div>
        <div className="firework" style={{animationDelay: '1s', top: '70%', left: '30%'}}></div>
      </>
    );
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === products[currentQuestion].scent) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < products.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
      } else {
        setCurrentScreen('results');
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentScreen('landing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  const startGame = () => {
    setCurrentScreen('game');
  };

  // Landing Page
  if (currentScreen === 'landing') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#FFF8F1',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {/* Eleven Australia Logo */}
          <div style={{
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <img 
              src="./assets/eleven-australia-logo.png" // Replace with your actual logo path
              alt="ELEVEN AUSTRALIA"
              style={{
                height: '40px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                // Fallback to text if logo fails to load
                e.target.style.display = 'none';
                const fallback = e.target.parentNode.querySelector('.logo-fallback');
                if (fallback) {
                  fallback.style.display = 'block';
                }
              }}
            />
            <div 
              className="logo-fallback"
              style={{
                display: 'none',
                color: '#666',
                fontSize: '1rem',
                fontWeight: 'bold',
                letterSpacing: '2px'
              }}
            >
              ELEVEN AUSTRALIA
            </div>
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            color: '#FF6B6B',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Guess the Scent
          </h1>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#FF6B6B',
            marginBottom: '40px'
          }}>
            to Win
          </h2>
          
          <div style={{
            fontSize: '1.2rem',
            color: '#333',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Test your nose! Can you match each Eleven Australia product with its signature scent?
            <br /><br />
            <strong>You need to get ALL 5 correct to win!</strong>
          </div>
          
          <button 
            onClick={startGame}
            style={{
              backgroundColor: '#FF6B6B',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#FF5252'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B6B'}
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  // Game Screen
  if (currentScreen === 'game') {
    const currentProduct = products[currentQuestion];
    const randomizedFruits = getRandomizedFruitOptions(); // Generate once and reuse
    
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#FFF8F1',
        fontFamily: 'Arial, sans-serif',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {/* Progress indicator */}
          <div style={{
            marginBottom: '30px',
            color: '#666',
            fontSize: '1.2rem'
          }}>
            Question {currentQuestion + 1} of {products.length}
          </div>
          
          {/* Product display */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '40px',
            marginBottom: '40px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            {/* Product Image */}
            <div style={{
              width: '250px',
              height: '300px',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={currentProduct.image}
                alt={currentProduct.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  backgroundColor: 'white'
                }}
                onError={(e) => {
                  // Hide the image and show fallback
                  e.target.style.display = 'none';
                  const fallback = e.target.parentNode.querySelector('.image-fallback');
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div 
                className="image-fallback"
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '10px',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  border: '2px dashed #ccc',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '10px' }}>
                  {currentProduct.productType === 'spray' ? '🧴' : 
                   currentProduct.productType === 'shampoo' ? '🧴' : '💊'}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#999', textAlign: 'center', padding: '10px' }}>
                  {currentProduct.name}
                </div>
              </div>
            </div>
            
            <h2 style={{
              color: '#FF6B6B',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '15px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {currentProduct.name}
            </h2>
            
            <p style={{
              color: '#333',
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '30px',
              maxWidth: '600px',
              margin: '0 auto 30px'
            }}>
              {currentProduct.description.split('.')[0]}.
            </p>
            
            <h3 style={{
              color: '#333',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '30px'
            }}>
              What scent does this product have?
            </h3>
          </div>

          {/* Answer options */}
          {!showFeedback && (
            <>
              <style>{`
                .fruit-button {
                  background-color: white !important;
                  border: 3px solid #FF6B6B !important;
                  border-radius: 10px !important;
                  padding: 20px !important;
                  cursor: pointer !important;
                  transition: all 0.3s ease !important;
                  font-size: 1.1rem !important;
                  font-weight: bold !important;
                  color: #333 !important;
                  transform: translateY(0px) !important;
                  min-width: 140px !important;
                  display: flex !important;
                  flex-direction: column !important;
                  align-items: center !important;
                }
                
                .fruit-button:hover {
                  background-color: #FF6B6B !important;
                  color: white !important;
                  transform: translateY(-2px) !important;
                }
                
                .fruit-button:hover .fruit-text {
                  color: white !important;
                }
                
                .fruit-button:hover .fruit-image img {
                  filter: brightness(1.1) !important;
                }
                
                @media (max-width: 768px) {
                  .fruit-button {
                    min-width: 120px !important;
                    padding: 15px !important;
                    font-size: 1rem !important;
                  }
                }
              `}</style>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '20px',
                alignItems: 'center'
              }}>
                {/* First row - 3 fruits */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  {randomizedFruits.slice(0, 3).map((fruit) => (
                    <button
                      key={fruit}
                      className="fruit-button"
                      onClick={() => handleAnswerSelect(fruit)}
                    >
                      <div className="fruit-image" style={{ marginBottom: '10px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img 
                          src={fruitImages[fruit]}
                          alt={fruit}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain',
                            borderRadius: '8px'
                          }}
                          onError={(e) => {
                            // Fallback to emoji if image fails to load
                            e.target.style.display = 'none';
                            const fallback = e.target.parentNode.querySelector('.fruit-emoji-fallback');
                            if (fallback) {
                              fallback.style.display = 'block';
                            }
                          }}
                        />
                        <div 
                          className="fruit-emoji-fallback"
                          style={{ 
                            fontSize: '3rem', 
                            display: 'none'
                          }}
                        >
                          {fruitEmojis[fruit]}
                        </div>
                      </div>
                      <div className="fruit-text">{fruit}</div>
                    </button>
                  ))}
                </div>
                
                {/* Second row - 2 fruits */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  justifyContent: 'center'
                }}>
                  {randomizedFruits.slice(3, 5).map((fruit) => (
                    <button
                      key={fruit}
                      className="fruit-button"
                      onClick={() => handleAnswerSelect(fruit)}
                    >
                      <div className="fruit-image" style={{ marginBottom: '10px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img 
                          src={fruitImages[fruit]}
                          alt={fruit}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain',
                            borderRadius: '8px'
                          }}
                          onError={(e) => {
                            // Fallback to emoji if image fails to load
                            e.target.style.display = 'none';
                            const fallback = e.target.parentNode.querySelector('.fruit-emoji-fallback');
                            if (fallback) {
                              fallback.style.display = 'block';
                            }
                          }}
                        />
                        <div 
                          className="fruit-emoji-fallback"
                          style={{ 
                            fontSize: '3rem', 
                            display: 'none'
                          }}
                        >
                          {fruitEmojis[fruit]}
                        </div>
                      </div>
                      <div className="fruit-text">{fruit}</div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div style={{
              backgroundColor: selectedAnswer === currentProduct.scent ? '#4CAF50' : '#F44336',
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {selectedAnswer === currentProduct.scent ? (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✓</div>
                  Correct! It's {currentProduct.scent}
                </>
              ) : (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✗</div>
                  Wrong! It's {currentProduct.scent}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Results Screen
  if (currentScreen === 'results') {
    const isPerfectScore = score === products.length;
    
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#FFF8F1',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {isPerfectScore && <ConfettiAnimation />}
        
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          zIndex: 10,
          position: 'relative'
        }}>
          {isPerfectScore ? (
            <>
              <div style={{ fontSize: '5rem', marginBottom: '30px' }}>🎉</div>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#FF6B6B',
                marginBottom: '40px',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                Congratulations!<br />
                You got them all correct!
              </h1>
              
              <div style={{
                fontSize: '1.5rem',
                color: '#4CAF50',
                marginBottom: '40px',
                fontWeight: 'bold'
              }}>
                Perfect Score: 5 out of 5! 🌟
              </div>
              
              <div style={{
                fontSize: '1.2rem',
                color: '#666',
                marginBottom: '40px',
                lineHeight: '1.6'
              }}>
                Amazing! You're a true Eleven Australia scent expert!
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '4rem', marginBottom: '30px' }}>😞</div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#FF6B6B',
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Sorry
              </h1>
              
              <div style={{
                fontSize: '1.5rem',
                color: '#333',
                marginBottom: '20px',
                fontWeight: 'bold'
              }}>
                You have {score} of 5 correct.
              </div>
              
              <div style={{
                fontSize: '1.3rem',
                color: '#666',
                marginBottom: '40px',
                lineHeight: '1.6'
              }}>
                You need all 5 correct to win.<br />
                Please come back and try again later.
              </div>
            </>
          )}
          
          <button 
            onClick={resetGame}
            style={{
              backgroundColor: '#FF6B6B',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#FF5252'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B6B'}
          >
            {isPerfectScore ? 'Play Again' : 'Try Again'}
          </button>
          
          <div style={{
            marginTop: '40px',
            color: '#666',
            fontSize: '1rem',
            fontWeight: 'bold',
            letterSpacing: '2px'
          }}>
            ELEVEN AUSTRALIA
          </div>
        </div>
      </div>
    );
  }
};

export default ScentGuessGame;